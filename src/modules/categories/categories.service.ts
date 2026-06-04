import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ICategoriesService } from './interfaces/categories-service.interface';
import { CategoriesRepository } from './categories.repository';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService implements ICategoriesService {
  constructor(
    @Inject('ICategoriesRepository')
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.findAll();
  }

  async findById(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesRepository.create(createCategoryDto);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    const updated = await this.categoriesRepository.update(
      id,
      updateCategoryDto,
    );
    return updated!;
  }

  async delete(id: number): Promise<void> {
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    await this.categoriesRepository.delete(id);
  }
}
