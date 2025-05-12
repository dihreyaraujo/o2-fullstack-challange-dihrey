export interface StockMovement {
  id?: string;
  productId: string;
  quantity: number;
  type: string;
  date: string;
}

export interface TopMovedProduct {
  productId: string;
  name: string;
  totalMoved: number;
}

export interface Product {
  id?: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
}

