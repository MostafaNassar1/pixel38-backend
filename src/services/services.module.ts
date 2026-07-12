import { Module } from '@nestjs/common';
import { PublicServicesController, AdminServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PublicServicesController, AdminServicesController],
  providers: [ServicesService, PrismaService],
})
export class ServicesModule {}