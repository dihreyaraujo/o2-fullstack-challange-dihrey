import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  labels: string[];
  data: number[];
}

export default function MostMovedProductsChart({ labels, data }: Props) {
  return (
    <div style={{ background: 'white', padding: '16px', borderRadius: '8px'}}>
      <h2>Produtos Mais Movimentados</h2>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: 'Quantidade Movimentada',
              data,
              backgroundColor: '#4caf50',
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true },
            title: { display: false }
          }
        }}
      />
    </div>
  );
}
