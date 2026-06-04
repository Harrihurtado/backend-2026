import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

export interface IProductsService {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  create(createProductDto: CreateProductDto): Promise<Product>;
  update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
  delete(id: number): Promise<void>;
}
