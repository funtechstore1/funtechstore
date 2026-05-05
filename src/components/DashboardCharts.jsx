import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardCharts({ pedidos }) {

  const pendientes = pedidos.filter(p => p.estado === "pendiente").length;
  const pagados = pedidos.filter(p => p.estado === "pagado").length;
  const enviados = pedidos.filter(p => p.estado === "Enviado").length;
  const entregados = pedidos.filter(p => p.estado === "Entregado").length;

  const data = {
    labels: ["Pendientes", "Pagados", "Enviados", "Entregados"],
    datasets: [
      {
        label: "Cantidad de pedidos",
        data: [pendientes, pagados, enviados, entregados]
      }
    ]
  };

  return (
    <div style={{ width: "600px", margin: "40px auto" }}>
      <Bar data={data} />
    </div>
  );
}

export default DashboardCharts;