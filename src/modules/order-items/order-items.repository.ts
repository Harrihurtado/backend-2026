import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBaseRepository } from '../../common/interfaces/base-repository.interface';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemsRepository implements IBaseRepository<OrderItem> {
  constructor(
    @InjectRepository(OrderItem)
    private readonly repository: Repository<OrderItem>,
  ) {}

  async findAll(): Promise<OrderItem[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<OrderItem | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(data: Partial<OrderItem>): Promise<OrderItem> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: number, data: Partial<OrderItem>): Promise<OrderItem | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
