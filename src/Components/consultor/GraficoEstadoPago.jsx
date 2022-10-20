import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { Spinnner } from '../ui/Spinnner';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export const GraficoEstadoPago = ({estadoPago}) => {
    
    const labels =estadoPago?.map(({ ESTADO_PAGO }) => ESTADO_PAGO);
    const data =estadoPago?.map(({ CANTIDAD }) => CANTIDAD);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' ,
          },
          title: {
            display: true,
            text: 'pagos',
          },
        },
      };


    const dataChart = {
        labels,
        datasets: [
            {
                label: "pagos",
                data: data,
                backgroundColor: [ 'rgba(233, 215, 53, 0.8)','rgba(36, 196, 4, 0.8)',
                'rgba(218, 50, 45, 0.8)'],
            },
            // {
            //     label: 'pendiente',
            //     data: estadoPago  ? [data[0]] : [0],
            //     backgroundColor:  'rgba(233, 215, 53, 0.8)',
            // },
            // {
            //     label: 'PAGADO',
            //     data:estadoPago  ? [data[1]] : [0] ,
            //     backgroundColor:  'rgba(36, 196, 4, 0.8)',
            // },
            // {
            //     label: 'RECHAZADO',
            //     data: estadoPago  ? [data[2]] : [0] ,
            //     backgroundColor:  'rgba(218, 50, 45, 0.8)',
            // },
          ],
      };
      
  return (
    <div className=''>
        {estadoPago ?
            <Bar options={options} data={dataChart} />
            : <div className='flex items-center justify-center'><Spinnner /></div> 
        }
    </div>
  )
}
