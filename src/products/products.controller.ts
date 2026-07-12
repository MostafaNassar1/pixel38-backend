import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, AddProductImageDto, ReorderImagesDto } from './product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiTags('Public - Products')
@Controller('public/products')
export class PublicProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active products' })
  findAll() {
    return this.productsService.findAllPublic();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single active product by id' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOnePublic(id);
  }
}

@ApiTags('Admin - Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/products')
export class AdminProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products (including inactive)' })
  findAll() {
    return this.productsService.findAllAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single product by id' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post(':id/images')
@ApiOperation({ summary: 'Add an image to a product' })
addImage(@Param('id') id: string, @Body() dto: AddProductImageDto) {
  return this.productsService.addImage(id, dto);
}

@Delete(':id/images/:imageId')
@ApiOperation({ summary: 'Remove an image from a product' })
removeImage(@Param('id') id: string, @Param('imageId') imageId: string) {
  return this.productsService.removeImage(id, imageId);
}

@Put(':id/images/reorder')
@ApiOperation({ summary: 'Reorder a product\'s images' })
reorderImages(@Param('id') id: string, @Body() dto: ReorderImagesDto) {
  return this.productsService.reorderImages(id, dto.imageIds);
}
}