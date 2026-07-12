import { IsString, IsOptional, IsInt, IsBoolean, IsObject } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class HomepageSectionDto {
  @ApiPropertyOptional({ example: 'a1b2c3d4-...', description: 'Omit to create a new section' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({ example: 'hero' })
  @IsString()
  section!: string;

  @ApiPropertyOptional({ example: 'Quality Wood, Crafted with Care' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Serving builders and homeowners since 1998' })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiPropertyOptional({ example: 'Full description text here...' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: { ctaText: 'Shop Now', ctaLink: '/products' } })
  @IsOptional()
  @IsObject()
  content?: Record<string, any>;

  @ApiPropertyOptional({ example: 'https://example.com/hero.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}