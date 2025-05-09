import api from './api';
import { TopMovedProduct } from '../types';

export const fetchTotalStockValue = async (): Promise<number> => {
  const res = await api.get('/report/total-stock-value');
  return res.data.totalValue;
};

export const fetchTotalItemsSold = async (): Promise<number> => {
  const res = await api.get('/report/total-items-sold');
  return res.data.totalItemsSold;
};

export const fetchTopMovedProducts = async (limit = 5): Promise<TopMovedProduct[]> => {
  const res = await api.get(`/report/top-moved-products?limit=${limit}`);
  return res.data;
};

export const fetchSalesByPeriod = async (start?: string, end?: string) => {
  if (!start || !end) {
    const resAll = await api.get(`/report/movements`);
    return resAll.data;
  } else {
    const res = await api.get(`/report/movements?start=${start}&end=${end}`);
    return res.data;
  }
};
