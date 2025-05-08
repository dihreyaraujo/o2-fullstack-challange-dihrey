import { ProductRepository } from '../repositories/ProductRepository';

export class ProductService {
  constructor(private repo: ProductRepository) {}

  create(data: any) {
    return this.repo.create(data);
  }

  getAll() {
    return this.repo.findAll();
  }

  getById(id: string) {
    return this.repo.findById(id);
  }

  update(id: string, data: any) {
    return this.repo.update(id, data);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
