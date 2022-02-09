import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

describe('User entity', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.password = 'testPassword';
    user.salt = 'testSalt';
    (bcrypt.hash as jest.Mock) = jest.fn();
  });

  describe('validatePassword', () => {
    it('returns true as password is valid', async () => {
      (bcrypt.hash as jest.Mock).mockReturnValue('testPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword('123456');
      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 'testSalt');
      expect(result).toEqual(true);
    });

    it('returns false as password is invalid', async () => {
      (bcrypt.hash as jest.Mock).mockReturnValue('wrongPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validatePassword('stillWrong');
      expect(bcrypt.hash).toHaveBeenCalledWith('stillWrong', 'testSalt');
      expect(result).toEqual(false);
    });
  });
});
