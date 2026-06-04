import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IOrderItemsService } from './interfaces/order-items-service.interface';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItemResponseDto } from './dto/order-item-response.dto';

@ApiTags('Order Items')
@Controller('order-items')
export class OrderItemsController {
  constructor(
    @Inject('IOrderItemsService')
    private readonly orderItemsService: IOrderItemsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all order items' })
  @ApiResponse({ status: 200, description: 'List of order items', type: [OrderItemResponseDto] })
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order item by id' })
  @ApiResponse({ status: 200, description: 'Order item found', type: OrderItemResponseDto })
  @ApiResponse({ status: 404, description: 'Order item not found' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order item' })
  @ApiResponse({ status: 201, description: 'Order item created', type: OrderItemResponseDto })
  @ApiResponse({ status: 400, description: 'Validation error or invalid orderId/productId' })
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an order item' })
  @ApiResponse({ status: 200, description: 'Order item updated', type: OrderItemResponseDto })
  @ApiResponse({ status: 404, description: 'Order item not found' })
  @ApiResponse({ status: 400, description: 'Invalid orderId or productId' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order item' })
  @ApiResponse({ status: 200, description: 'Order item deleted' })
  @ApiResponse({ status: 404, description: 'Order item not found' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemsService.delete(id);
  }
}
