import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [allTotalStockValue, setAllTotalStockValue] = useState(0);
  const [totalItemsSold, setTotalItemsSold] = useState(0);
  const [topProducts, setTopProducts] = useState<TopMovedProduct[]>([]);
  const [salesData, setSalesData] = useState<{ date: string; total: number }[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [mode, setMode] = useState<'sales' | 'movements'>('sales');
  const [chartTitle, setChartTitle] = useState('Vendas por Período');

  const navigate = useNavigate();

  useEffect(() => {
    fetchTotalStockValue().then(totalValue => {
      setTotalStockValue(totalValue);
      fetchSalesByPeriod().then(movements => {
        const allOutType = movements.filter((move: any) => move.type === 'saida');
        const sumAllOutType = allOutType.reduce((acc: number, moveOut: any) => acc + Number(moveOut.value), 0);
        setAllTotalStockValue(Number(sumAllOutType) + Number(totalValue));
      });
    });
    fetchTotalItemsSold().then(setTotalItemsSold);
    fetchTopMovedProducts(5).then(setTopProducts);
    fetchSalesByPeriod().then(movements => {
      const allOutType = movements.filter((move: any) => move.type === 'saida');
      const sumAllOutType = allOutType.reduce((acc: number, moveOut: any) => acc + Number(moveOut.value), 0);
      setAllTotalStockValue(Number(sumAllOutType) + Number(totalStockValue));
    });

    const now = new Date();
    const defaultStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const defaultEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

    setStartDate(defaultStart);
    setEndDate(defaultEnd);

    fetchData(defaultStart, defaultEnd, mode);
  }, [mode, totalStockValue]);

  const fetchData = (start: string, end: string, currentMode: 'sales' | 'movements') => {
    fetchSalesByPeriod(start, end).then(movements => {
      const dataByDate: Record<string, number> = {};

      movements
        .filter((m: any) => currentMode === 'sales' ? m.type === 'saida' : true)
        .forEach((m: any) => {
          dataByDate[m.date] = (dataByDate[m.date] || 0) + m.quantity;
        });

      const result = Object.entries(dataByDate).map(([date, total]) => ({
        date,
        total,
      }));

      setSalesData(result);
    });
  };

  const handleSearch = () => {
    if (startDate && endDate) {
      fetchData(startDate, endDate, mode);
    }
  };

  const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMode = event.target.value as 'sales' | 'movements';
    setMode(selectedMode);
    setChartTitle(selectedMode === 'sales' ? 'Vendas por Período' : 'Movimentações por Período');
  };

  function formatarNumeroBrasileiro(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1 className='titleDashboard'>Dashboard</h1>
        <div className="nav-buttons">
          <button onClick={() => navigate('/products')}>Ir para Produtos 🛒</button>
          <button onClick={() => navigate('/movements')}>Ir para Movimentações 📦</button>
        </div>
      </div>

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

            <label className="select-container">
              Tipo:
              <select
                value={mode}
                onChange={handleModeChange}
                className="styled-select"
              >
                <option value="sales">Vendas por período</option>
                <option value="movements">Movimentações por período</option>
              </select>
            </label>

            <button className="search-button" onClick={handleSearch}>Buscar</button>
          </div>

          <div className="chart-container">
            <SalesChart
              labels={salesData.map(d => {
                const date = new Date(d.date);
                return date.toLocaleDateString('pt-BR');
              })}
              data={salesData.map(d => d.total)}
              title={chartTitle}
            />
          </div>
        </div>

        <div className='summary-container'>
          <div className="summary">
            <div className="card">
              <h2>Valor Total em Estoque</h2>
              <p>R$ {formatarNumeroBrasileiro(Number(totalStockValue.toFixed(2)))}</p>
            </div>
            <div className="card">
              <h2>Valor Total do <br />Estoque</h2>
              <p>R$ {formatarNumeroBrasileiro(Number(allTotalStockValue.toFixed(2)))}</p>
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
                  <span>{p.totalMoved} {p.totalMoved === 1 ? 'movimentação' : 'movimentações'}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
