import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, IsArray, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Oak Hardwood' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Premium oak hardwood, ideal for flooring and furniture.' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 'Hardwood' })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiPropertyOptional({ example: 45.99 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    example: [
      { label: 'Durability', positive: true },
      { label: 'Expensive', positive: false },
    ],
  })
  @IsOptional()
  traits?: { label: string; positive: boolean }[];
}

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Oak Hardwood' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: [
      { label: 'Durability', positive: true },
      { label: 'Expensive', positive: false },
    ],
  })
  @IsOptional()
  traits?: { label: string; positive: boolean }[];
}

export class AddProductImageDto {
  @ApiProperty({ example: '/uploads/1234567-891234.jpg' })
  @IsString()
  @IsNotEmpty()
  imageUrl!: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  order?: number;
}

export class ReorderImagesDto {
  @ApiProperty({
    example: ['image-id-1', 'image-id-2', 'image-id-3'],
    description: 'Array of image IDs in the desired new order',
  })
  @IsArray()
  @IsUUID('4', { each: true })
  imageIds!: string[];
}