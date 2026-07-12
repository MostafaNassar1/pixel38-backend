import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto, UpdateProductDto, AddProductImageDto } from './product.dto';


@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAllPublic() {
    return this.prisma.product.findMany({
      where: { isActive: true },
      include: { images: { orderBy: { order: 'asc' } } },
    });
  }

  async findAllAdmin() {
    return this.prisma.product.findMany({
      include: { images: { orderBy: { order: 'asc' } } },
    });
  }

  async findOnePublic(id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, isActive: true },
      include: { images: { orderBy: { order: 'asc' } } },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { order: 'asc' } } },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async create(dto: CreateProductDto) {
    return this.prisma.product.create({ data: dto });
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findOne(id);
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.product.delete({ where: { id } });
    return { message: 'Product deleted successfully' };
  }

  async addImage(productId: string, dto: AddProductImageDto) {
  await this.findOne(productId); // confirms product exists, throws 404 if not

  return this.prisma.productImage.create({
    data: {
      productId,
      imageUrl: dto.imageUrl,
      order: dto.order ?? 0,
    },
  });
}

async removeImage(productId: string, imageId: string) {
  const image = await this.prisma.productImage.findFirst({
    where: { id: imageId, productId },
  });
  if (!image) {
    throw new NotFoundException('Image not found for this product');
  }
  await this.prisma.productImage.delete({ where: { id: imageId } });
  return { message: 'Image deleted successfully' };
}

async reorderImages(productId: string, imageIds: string[]) {
  await this.findOne(productId);

  await Promise.all(
    imageIds.map((id, index) =>
      this.prisma.productImage.update({
        where: { id },
        data: { order: index },
      }),
    ),
  );

  return this.prisma.productImage.findMany({
    where: { productId },
    orderBy: { order: 'asc' },
  });
}
}

