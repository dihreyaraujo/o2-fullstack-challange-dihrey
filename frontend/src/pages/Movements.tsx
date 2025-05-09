import { useState } from 'react';
import { fetchMovementsByPeriod } from '../services/movementService';
import { StockMovement } from '../types';
import '../styles/Movements.css';

export default function Movements() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [movements, setMovements] = useState<StockMovement[]>([]);

  const handleSearch = () => {
    fetchMovementsByPeriod(start, end).then(setMovements);
  };

  return (
    <div>
      <h1>Movimentações</h1>
      <input type="date" value={start} onChange={e => setStart(e.target.value)} />
      <input type="date" value={end} onChange={e => setEnd(e.target.value)} />
      <button onClick={handleSearch}>Buscar</button>

      <ul>
        {movements.map(m => (
          <li key={m.id}>
            {m.date} - {m.type === 'entrada' ? 'Entrada' : 'Saída'} - Qtd: {m.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}