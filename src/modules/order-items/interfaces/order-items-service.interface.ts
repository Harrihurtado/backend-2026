import { CreateOrderItemDto } from '../dto/create-order-item.dto';
import { UpdateOrderItemDto } from '../dto/update-order-item.dto';
import { OrderItem } from '../entities/order-item.entity';

export interface IOrderItemsService {
  findAll(): Promise<OrderItem[]>;
  findById(id: number): Promise<OrderItem>;
  create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem>;
  update(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<OrderItem>;
  delete(id: number): Promise<void>;
}
