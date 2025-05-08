import { Product } from '../models/Product';

export class ProductRepository {
  async create(data: Partial<Product>) {
    return await Product.create(data);
  }

  async findAll() {
    return await Product.findAll();
  }

  async findById(id: string) {
    return await Product.findByPk(id);
  }

  async update(id: string, data: Partial<Product>) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    return await product.update(data);
  }

  async delete(id: string) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    await product.destroy();
    return product;
  }
}
