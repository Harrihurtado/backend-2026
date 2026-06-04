import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UsersModule],
  controllers: [OrdersController],
  providers: [
    { provide: 'IOrdersService', useClass: OrdersService },
    { provide: 'IOrdersRepository', useClass: OrdersRepository },
  ],
  exports: ['IOrdersService'],
})
export class OrdersModule {}
