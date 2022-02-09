import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Manufacturer } from '../mfr-mold.type';

export class GetDiscsFilterDto {
  @IsOptional()
  @IsEnum(Manufacturer)
  manufacturer: Manufacturer;

  @IsOptional()
  @IsNotEmpty()
  mold: string;

  @IsOptional()
  @IsNotEmpty()
  userId: string;
}
