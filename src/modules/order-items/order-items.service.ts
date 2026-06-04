import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IOrderItemsService } from './interfaces/order-items-service.interface';
import { OrderItemsRepository } from './order-items.repository';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { IOrdersService } from '../orders/interfaces/orders-service.interface';
import { IProductsService } from '../products/interfaces/products-service.interface';

@Injectable()
export class OrderItemsService implements IOrderItemsService {
  constructor(
    @Inject('IOrderItemsRepository')
    private readonly orderItemsRepository: OrderItemsRepository,
    @Inject('IOrdersService')
    private readonly ordersService: IOrdersService,
    @Inject('IProductsService')
    private readonly productsService: IProductsService,
  ) {}

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemsRepository.findAll();
  }

  async findById(id: number): Promise<OrderItem> {
    const orderItem = await this.orderItemsRepository.findById(id);
    if (!orderItem) {
      throw new NotFoundException(`OrderItem with id ${id} not found`);
    }
    return orderItem;
  }

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    await this.validateOrderExists(createOrderItemDto.orderId);
    await this.validateProductExists(createOrderItemDto.productId);
    return this.orderItemsRepository.create(createOrderItemDto);
  }

  async update(
    id: number,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    const orderItem = await this.orderItemsRepository.findById(id);
    if (!orderItem) {
      throw new NotFoundException(`OrderItem with id ${id} not found`);
    }
    if (updateOrderItemDto.orderId) {
      await this.validateOrderExists(updateOrderItemDto.orderId);
    }
    if (updateOrderItemDto.productId) {
      await this.validateProductExists(updateOrderItemDto.productId);
    }
    const updated = await this.orderItemsRepository.update(
      id,
      updateOrderItemDto,
    );
    return updated!;
  }

  async delete(id: number): Promise<void> {
    const orderItem = await this.orderItemsRepository.findById(id);
    if (!orderItem) {
      throw new NotFoundException(`OrderItem with id ${id} not found`);
    }
    await this.orderItemsRepository.delete(id);
  }

  private async validateOrderExists(orderId: number): Promise<void> {
    try {
      await this.ordersService.findById(orderId);
    } catch {
      throw new BadRequestException(
        `Order with id ${orderId} does not exist`,
      );
    }
  }

  private async validateProductExists(productId: number): Promise<void> {
    try {
      await this.productsService.findById(productId);
    } catch {
      throw new BadRequestException(
        `Product with id ${productId} does not exist`,
      );
    }
  }
}
