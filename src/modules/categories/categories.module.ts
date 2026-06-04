import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [
    { provide: 'ICategoriesService', useClass: CategoriesService },
    { provide: 'ICategoriesRepository', useClass: CategoriesRepository },
  ],
  exports: ['ICategoriesService'],
})
export class CategoriesModule {}
