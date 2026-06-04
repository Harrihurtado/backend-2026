import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Gaming Mouse' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'High-DPI gaming mouse' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 49.99 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ example: 200 })
  @IsInt()
  @Min(0)
  @IsOptional()
  stock?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsInt()
  @IsPositive()
  @IsOptional()
  categoryId?: number;
}
