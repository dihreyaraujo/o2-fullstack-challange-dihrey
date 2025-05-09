import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  labels: string[];
  data: number[];
}

export default function SalesChart({ labels, data }: Props) {
  return (
    <div style={{ background: 'white', padding: '16px', borderRadius: '8px', width: '50vw' }}>
      <h2>Vendas por Período</h2>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: 'Itens Vendidos',
              data,
              borderColor: '#1a73e8',
              backgroundColor: 'rgba(26, 115, 232, 0.1)',
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true },
            title: { display: false }
          },
          scales: {
            x: {
              ticks: {
                padding: 12, // Aumenta o espaço entre o eixo X e os labels (datas)
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}
