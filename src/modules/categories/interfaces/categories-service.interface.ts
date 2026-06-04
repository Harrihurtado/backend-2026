import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

export interface ICategoriesService {
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category>;
  create(createCategoryDto: CreateCategoryDto): Promise<Category>;
  update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
  delete(id: number): Promise<void>;
}
