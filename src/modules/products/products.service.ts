import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IProductsService } from './interfaces/products-service.interface';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ICategoriesService } from '../categories/interfaces/categories-service.interface';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(
    @Inject('IProductsRepository')
    private readonly productsRepository: ProductsRepository,
    @Inject('ICategoriesService')
    private readonly categoriesService: ICategoriesService,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    await this.validateCategoryExists(createProductDto.categoryId);
    return this.productsRepository.create(createProductDto);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    if (updateProductDto.categoryId) {
      await this.validateCategoryExists(updateProductDto.categoryId);
    }
    const updated = await this.productsRepository.update(id, updateProductDto);
    return updated!;
  }

  async delete(id: number): Promise<void> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.productsRepository.delete(id);
  }

  private async validateCategoryExists(categoryId: number): Promise<void> {
    try {
      await this.categoriesService.findById(categoryId);
    } catch {
      throw new BadRequestException(
        `Category with id ${categoryId} does not exist`,
      );
    }
  }
}
