import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoriesModule],
  controllers: [ProductsController],
  providers: [
    { provide: 'IProductsService', useClass: ProductsService },
    { provide: 'IProductsRepository', useClass: ProductsRepository },
  ],
  exports: ['IProductsService'],
})
export class ProductsModule {}
