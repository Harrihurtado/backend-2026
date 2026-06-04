import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateOrderItemDto {
  @ApiPropertyOptional({ example: 2 })
  @IsInt()
  @IsPositive()
  @IsOptional()
  orderId?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsInt()
  @IsPositive()
  @IsOptional()
  productId?: number;

  @ApiPropertyOptional({ example: 5 })
  @IsInt()
  @IsPositive()
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional({ example: 19.99 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  unitPrice?: number;
}
