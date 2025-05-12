import React from 'react';

interface MovementCardProps {
  productName: string;
  type: string;
  quantity: number;
  date: string;
}

const MovementCard: React.FC<MovementCardProps> = ({ productName, type, quantity, date }) => {
  return (
    <div className="card">
      <h2>{productName}</h2>
      <p>Tipo: {type}</p>
      <p>Quantidade: {quantity}</p>
      <p>Data: {date}</p>
    </div>
  );
};

export default MovementCard;
