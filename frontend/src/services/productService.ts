import api from './api';
import { Product } from '../types';

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await api.get('/products');
  return res.data;
}

export const fetchCreateProducts = async (body: Product): Promise<Product> => {
  const res = await api.post('/products', {
    name: body.name,
    description: body.description,
    category: body.category,
    price: body.price,
    quantity: body.quantity
  });
  return res.data;
}

export const fetchDeleteProduct = async (id: string): Promise<Product> => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
}

export const fetchUpdateProduct = async (id: string, body: Product): Promise<Product> => {
  const res = await api.put(`/products/${id}`, {
    name: body.name,
    description: body.description,
    category: body.category,
    price: body.price,
    quantity: body.quantity
  });
  return res.data;
}
