import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { HomepageService } from './homepage.service';
import { HomepageSectionDto } from './homepage.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiTags('Public - Homepage')
@Controller('public/homepage')
export class PublicHomepageController {
  constructor(private homepageService: HomepageService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active homepage content sections' })
  findAll() {
    return this.homepageService.findAllPublic();
  }
}

@ApiTags('Admin - Homepage')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/homepage')
export class AdminHomepageController {
  constructor(private homepageService: HomepageService) {}

  @Get()
  @ApiOperation({ summary: 'Get all homepage sections (including inactive)' })
  findAll() {
    return this.homepageService.findAllAdmin();
  }

  @Put()
  @ApiOperation({ summary: 'Create/update homepage sections (hero, banners, text blocks)' })
  @ApiBody({ type: [HomepageSectionDto] })
  update(@Body() sections: HomepageSectionDto[]) {
    return this.homepageService.upsertSections(sections);
  }
}