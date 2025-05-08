import { Request, Response } from 'express';
import { makeProductService } from '../factories/ProductFactory';

const service = makeProductService();

export const ProductController = {

  async create(req: Request, res: Response) {
    try {
      const product = await service.create(req.body);
      res.status(201).json(product);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response) {
    const products = await service.getAll();
    res.status(200).json(products);
  },

  async getById(req: Request, res: Response) {
    const product = await service.getById(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Produto não encontrado' });
    } else {
      res.status(200).json(product);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updated = await service.update(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const deleted = await service.delete(req.params.id);
      res.status(200).json(deleted);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
};
