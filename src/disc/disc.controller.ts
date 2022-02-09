import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Disc } from './disc.entity';
import { DiscService } from './disc.service';
import { CreateDiscDto } from './dto/create-disc.dto';
import { GetDiscsFilterDto } from './dto/get-discs.dto';
import { DiscValidationPipe } from './pipes/disc-validation.pipe';

@Controller('disc')
export class DiscController {
  constructor(private discService: DiscService) {}

  @Get()
  getDiscs(
    @Query(ValidationPipe) filterDto: GetDiscsFilterDto,
  ): Promise<Disc[]> {
    return this.discService.getDiscs(filterDto);
  }

  @Get('/:id')
  getDiscById(@Param('id', ParseIntPipe) id: number): Promise<Disc> {
    return this.discService.getDiscById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createDisc(
    @Body(DiscValidationPipe) createDiscDto: CreateDiscDto,
    @GetUser() user: User,
  ): Promise<Disc> {
    return this.discService.createDisc(createDiscDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteDisc(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.discService.deleteDisc(id, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  editDisc(
    @Param('id', ParseIntPipe) id: number,
    @Body(DiscValidationPipe) createDiscDto: CreateDiscDto,
    @GetUser() user: User,
  ): Promise<Disc> {
    return this.discService.editDisc(id, createDiscDto, user);
  }
}
