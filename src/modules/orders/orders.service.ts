import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IOrdersService } from './interfaces/orders-service.interface';
import { OrdersRepository } from './orders.repository';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IUsersService } from '../users/interfaces/users-service.interface';

@Injectable()
export class OrdersService implements IOrdersService {
  constructor(
    @Inject('IOrdersRepository')
    private readonly ordersRepository: OrdersRepository,
    @Inject('IUsersService')
    private readonly usersService: IUsersService,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.findAll();
  }

  async findById(id: number): Promise<Order> {
    const order = await this.ordersRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    await this.validateUserExists(createOrderDto.userId);
    return this.ordersRepository.create(createOrderDto);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.ordersRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    if (updateOrderDto.userId) {
      await this.validateUserExists(updateOrderDto.userId);
    }
    const updated = await this.ordersRepository.update(id, updateOrderDto);
    return updated!;
  }

  async delete(id: number): Promise<void> {
    const order = await this.ordersRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    await this.ordersRepository.delete(id);
  }

  private async validateUserExists(userId: number): Promise<void> {
    try {
      await this.usersService.findById(userId);
    } catch {
      throw new BadRequestException(
        `User with id ${userId} does not exist`,
      );
    }
  }
}
