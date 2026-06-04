import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { Order } from '../entities/order.entity';

export interface IOrdersService {
  findAll(): Promise<Order[]>;
  findById(id: number): Promise<Order>;
  create(createOrderDto: CreateOrderDto): Promise<Order>;
  update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order>;
  delete(id: number): Promise<void>;
}
