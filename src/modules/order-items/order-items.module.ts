import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemsController } from './order-items.controller';
import { OrderItemsService } from './order-items.service';
import { OrderItemsRepository } from './order-items.repository';
import { OrdersModule } from '../orders/orders.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem]),
    OrdersModule,
    ProductsModule,
  ],
  controllers: [OrderItemsController],
  providers: [
    { provide: 'IOrderItemsService', useClass: OrderItemsService },
    { provide: 'IOrderItemsRepository', useClass: OrderItemsRepository },
  ],
  exports: ['IOrderItemsService'],
})
export class OrderItemsModule {}
