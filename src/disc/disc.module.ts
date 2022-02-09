import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DiscController } from './disc.controller';
import { DiscRepository } from './disc.repository';
import { DiscService } from './disc.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiscRepository]), AuthModule],
  providers: [DiscService],
  controllers: [DiscController],
})
export class DiscModule {}
