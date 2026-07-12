import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateServiceDto, UpdateServiceDto } from './service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAllPublic() {
    return this.prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  // Admin: everything, including inactive
  async findAllAdmin() {
    return this.prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    return service;
  }

  async create(dto: CreateServiceDto) {
    return this.prisma.service.create({ data: dto });
  }

  async update(id: string, dto: UpdateServiceDto) {
    await this.findOne(id); // throws 404 if it doesn't exist
    return this.prisma.service.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.service.delete({ where: { id } });
    return { message: 'Service deleted successfully' };
  }
}