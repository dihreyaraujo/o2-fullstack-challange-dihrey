import React from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  stock: number;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, stock, onEdit, onDelete }) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Preço: R$ {price.toFixed(2)}</p>
      <p>Estoque: {stock}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onEdit}>Editar</button>
        <button onClick={onDelete}>Excluir</button>
      </div>
    </div>
  );
};

export default ProductCard;
