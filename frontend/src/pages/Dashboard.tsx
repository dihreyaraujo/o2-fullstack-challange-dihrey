import { useEffect, useState } from 'react';
import {
  fetchTotalItemsSold,
  fetchTotalStockValue,
  fetchTopMovedProducts,
  fetchSalesByPeriod
} from '../services/reportService';
import SalesChart from '../components/Charts/SalesChart';
import { TopMovedProduct } from '../types';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [totalStockValue, setTotalStockValue] = useState(0);
  const [totalItemsSold, setTotalItemsSold] = useState(0);
  const [topProducts, setTopProducts] = useState<TopMovedProduct[]>([]);
  const [salesData, setSalesData] = useState<{ date: string; total: number }[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchTotalStockValue().then(setTotalStockValue);
    fetchTotalItemsSold().then(setTotalItemsSold);
    fetchTopMovedProducts(5).then(setTopProducts);

    const now = new Date();
    const defaultStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const defaultEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

    setStartDate(defaultStart);
    setEndDate(defaultEnd);

    fetchSales(defaultStart, defaultEnd);
  }, []);

  const fetchSales = (start: string, end: string) => {
    fetchSalesByPeriod(start, end).then(movements => {
      const soldByDate: Record<string, number> = {};

      movements
        .filter((m: any) => m.type === 'saida')
        .forEach((m: any) => {
          soldByDate[m.date] = (soldByDate[m.date] || 0) + m.quantity;
        });

      const result = Object.entries(soldByDate).map(([date, total]) => ({
        date,
        total,
      }));

      setSalesData(result);
    });
  };

  const handleSearch = () => {
    if (startDate && endDate) {
      fetchSales(startDate, endDate);
    }
  };

  return (
    <div>
      <h1 className='titleDashboard'>Dashboard</h1>
      <div className="dashboard">
        <div>
          <div className="date-filter">
            <label>
              Início:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              Fim:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <button onClick={handleSearch}>Buscar</button>
          </div>

          <div className="chart-container">
            <SalesChart
              labels={salesData.map(d => {
                const date = new Date(d.date);
                return date.toLocaleDateString('pt-BR');
              })}
              data={salesData.map(d => d.total)}
            />
          </div>
        </div>

        <div className='summary-container'>
          <div className="summary">
            <div className="card">
              <h2>Valor Total em Estoque</h2>
              <p>R$ {totalStockValue.toFixed(2)}</p>
            </div>
            <div className="card">
              <h2>Total de Itens Vendidos</h2>
              <p>{totalItemsSold}</p>
            </div>
          </div>
          <ul className="top-products">
            <h2>Top 5 Produtos Mais Movimentados</h2>
            {topProducts.map((p, index) => (
              <li key={p.productId} className="top-product-item">
                <span className="index-circle">{index + 1}</span>
                <div className="product-info">
                  <strong>{p.name}</strong>
                  <span>{p.totalMoved} movimentações</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
