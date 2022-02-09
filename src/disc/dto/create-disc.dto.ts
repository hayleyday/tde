import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Color, Manufacturer } from '../mfr-mold.type';

export class CreateDiscDto {
  @IsEnum(Manufacturer)
  manufacturer: Manufacturer;

  @IsString()
  @IsNotEmpty()
  mold: string;

  @IsString()
  @IsNotEmpty()
  plastic: string;

  @IsEnum(Color)
  color: Color;

  @IsString()
  description: string;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  photos: string[];

  @IsNumberString()
  @MaxLength(3)
  price: string;

  @IsNumberString({ no_symbols: true })
  @MaxLength(2)
  condition: string;

  @IsNumberString({ no_symbols: true })
  @MinLength(2)
  @MaxLength(3)
  weightGrams: string;
}
