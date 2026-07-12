import { Module } from '@nestjs/common';
import { PublicProductsController, AdminProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PublicProductsController, AdminProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}