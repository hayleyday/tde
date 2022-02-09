import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Color, Manufacturer } from './mfr-mold.type';

@Entity()
export class Disc extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  manufacturer: Manufacturer;

  @Column()
  mold: string;

  @Column()
  weightGrams: number;

  @Column()
  condition: number;

  @Column()
  plastic: string;

  @Column()
  price: number;

  @Column()
  color: Color;

  @Column()
  description: string;

  @Column('text', { array: true })
  photos: string[];

  @ManyToOne(
    type => User,
    user => user.discs,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;
}
