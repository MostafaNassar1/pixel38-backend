import { Module } from '@nestjs/common';
import { PublicHomepageController, AdminHomepageController } from './homepage.controller';
import { HomepageService } from './homepage.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PublicHomepageController, AdminHomepageController],
  providers: [HomepageService, PrismaService],
})
export class HomepageModule {}