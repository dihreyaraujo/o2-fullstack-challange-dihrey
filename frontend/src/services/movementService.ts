import api from './api';
import { StockMovement } from '../types';

export const fetchMovementsByPeriod = async (start: string, end: string): Promise<StockMovement[]> => {
  const res = await api.get(`/report/movements?start=${start}&end=${end}`);
  return res.data;
};

export const fetchMovements = async (): Promise<StockMovement[]> => {
  const res = await api.get(`/report/movements`);
  return res.data;
};

export const fetchCreateMovement = async (movement: StockMovement): Promise<void> => {
  await api.post('/stock', movement);
}