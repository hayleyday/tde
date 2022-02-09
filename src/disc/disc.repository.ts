import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { Disc } from './disc.entity';
import { CreateDiscDto } from './dto/create-disc.dto';
import { GetDiscsFilterDto } from './dto/get-discs.dto';

@EntityRepository(Disc)
export class DiscRepository extends Repository<Disc> {
  async getDiscs(filterDto: GetDiscsFilterDto): Promise<Disc[]> {
    const { manufacturer, mold, userId } = filterDto;
    const query = this.createQueryBuilder('disc');

    if (manufacturer) {
      query.andWhere('disc.manufacturer = :manufacturer', { manufacturer });
    }

    if (mold) {
      query.andWhere('disc.mold LIKE :mold', { mold: `%${mold}%` });
    }

    if (userId) {
      query.andWhere('disc.userId = :userId', { userId });
    }

    const discs = await query.getMany();
    return discs;
  }

  async createDisc(createDiscDto: CreateDiscDto, user: User): Promise<Disc> {
    const disc = new Disc();
    const {
      manufacturer,
      mold,
      condition,
      weightGrams,
      plastic,
      color,
      price,
      photos,
      description,
    } = createDiscDto;
    disc.manufacturer = manufacturer;
    disc.mold = mold;
    disc.condition = parseInt(condition);
    disc.weightGrams = parseInt(weightGrams);
    disc.plastic = plastic;
    disc.color = color;
    disc.description = description;
    disc.price = parseInt(price);
    disc.photos = photos;
    disc.user = user;
    await disc.save();
    delete disc.user;
    return disc;
  }
}
