import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBaseRepository } from '../../common/interfaces/base-repository.interface';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersRepository implements IBaseRepository<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Order | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(data: Partial<Order>): Promise<Order> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: number, data: Partial<Order>): Promise<Order | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
