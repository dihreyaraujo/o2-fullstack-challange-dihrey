export interface StockMovement {
  id: string;
  productId: string;
  quantity: number;
  type: 'entrada' | 'saida';
  date: string;
}

export interface TopMovedProduct {
  productId: string;
  name: string;
  totalMoved: number;
}
