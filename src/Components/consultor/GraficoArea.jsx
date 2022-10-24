import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Spinnner } from "../ui/Spinnner";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartDataLabels
);
export const GraficoArea = ({ comprasPorMes }) => {
    // console.log(tipoVenta);
    const labels =comprasPorMes?.map(({ MES }) => MES);
    const data =comprasPorMes?.map(({ TOTAL_COMPRAS }) => TOTAL_COMPRAS);
    const options = {
      plugins: {
        legend: {
          display: true,
          align: 'center'
         
        },
        datalabels: {
          display: true,
          color: "black",
          align: "end",
          padding: {
            right: 2,
          },
          labels: {
            title: {
              font: {
                weight: "bold"
              }
            },
          },
        }
      }
    };
      const dataChart = {
        labels,
        datasets: [
          {
            fill: true,
            label: 'Ventas',
            data,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
  // const config = {
  //     type: 'pie',
  //     data: dataChart,
  //     options: {}
  // };

    return (
        <div >
        {comprasPorMes ?
            <Line   data={dataChart} options={options}/>
            : <div className='flex items-center justify-center'><Spinnner /></div> 
        }
        </div>
    );
};
