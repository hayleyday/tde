import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Disc } from './disc.entity';
import { DiscRepository } from './disc.repository';
import { CreateDiscDto } from './dto/create-disc.dto';
import { GetDiscsFilterDto } from './dto/get-discs.dto';

@Injectable()
export class DiscService {
  constructor(
    @InjectRepository(DiscRepository) private discRepository: DiscRepository,
  ) {}

  async getDiscs(filterDto: GetDiscsFilterDto): Promise<Disc[]> {
    return this.discRepository.getDiscs(filterDto);
  }

  async getDiscById(id: number): Promise<Disc> {
    const found = await this.discRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Disc with id of '${id}' not found`);
    }
    return found;
  }

  createDisc(createDiscDto: CreateDiscDto, user: User): Promise<Disc> {
    return this.discRepository.createDisc(createDiscDto, user);
  }

  async deleteDisc(id: number, user: User): Promise<void> {
    const result = await this.discRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Disc with id of '${id}' not found`);
    }
  }

  async editDisc(
    id: number,
    createDiscDto: CreateDiscDto,
    user: User,
  ): Promise<Disc> {
    const disc = await this.getDiscById(id);
    if (disc.userId !== user.id) {
      throw new UnauthorizedException(`Unable to edit disc, you do not own it`);
    }
    const {
      manufacturer,
      mold,
      condition,
      plastic,
      color,
      description,
      price,
      photos,
      weightGrams,
    } = createDiscDto;
    disc.manufacturer = manufacturer;
    disc.mold = mold;
    disc.description = description;
    disc.condition = parseInt(condition);
    disc.plastic = plastic;
    disc.color = color;
    disc.price = parseInt(price);
    disc.photos = photos;
    disc.weightGrams = parseInt(weightGrams);
    await disc.save();
    return disc;
  }
}
