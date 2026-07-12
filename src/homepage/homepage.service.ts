import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { HomepageSectionDto } from './homepage.dto';

@Injectable()
export class HomepageService {
  constructor(private prisma: PrismaService) {}

  async findAllPublic() {
    return this.prisma.homepageContent.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async findAllAdmin() {
    return this.prisma.homepageContent.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async upsertSections(sections: HomepageSectionDto[]) {
    const results = await Promise.all(
      sections.map((section) => {
        if (section.id) {
          // Existing section — update it
          const { id, ...data } = section;
          return this.prisma.homepageContent.update({
            where: { id },
            data,
          });
        } else {
          // New section — create it
          const { id, ...data } = section;
          return this.prisma.homepageContent.create({ data });
        }
      }),
    );
    return results;
  }
}