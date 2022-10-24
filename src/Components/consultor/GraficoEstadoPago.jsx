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
    
    const labels =estadoPago?.map(({ ESTADO_PAGO }) => (ESTADO_PAGO));
    const data = estadoPago?.map(({ CANTIDAD }) => (CANTIDAD));
    

    const options = {
      plugins: {
        legend: {
          display: true,
          align: 'center',
          
         
        },
        datalabels: {
          display: true,
          color: "black",
          align: "center",
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

    // console.log(labels)
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
            //     data: data && [data[0]] ,
            //     backgroundColor:  'rgba(233, 215, 53, 0.8)',
            // },
            // {
            //     label: 'PAGADO',
            //     data:  data && [data[1]]  ,
            //     backgroundColor:  'rgba(36, 196, 4, 0.8)',
            // },
            // {
            //     label: 'RECHAZADO',
            //     data:  data && [data[2]]  ,
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
