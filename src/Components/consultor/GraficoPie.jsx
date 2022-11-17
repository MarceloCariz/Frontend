import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Spinnner } from '../ui/Spinnner';



ChartJS.register(ArcElement, Tooltip, Legend);
export const GraficoPie = ({tipoVenta}) => {
   const datosMemo = useMemo(() => tipoVenta, [tipoVenta]);

    const labels = datosMemo?.map(({TIPO_VENTA})=>(TIPO_VENTA));
    const data = datosMemo?.map(({CANTIDAD})=>(CANTIDAD));
    const dataChart = {
        labels : labels,
        datasets:[{
            label: "Compras por Tipo cliente",
            backgroundColor: [
                'rgba(150, 99, 220, 0.8)',
                'rgba(54, 190, 205, 0.8)',
            ],
            borderColor: 'rgb(253, 253, 253)',
            borderWidth: 1,
            data
        }]
    }
    // const config = {
    //     type: 'pie',
    //     data: dataChart,
    //     options: {}
    // };
    const options = {
        plugins: {
          legend: {
            display: true,
            align: 'center'
           
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

    return (
    <div>
        {datosMemo ?
            <div className='flex flex-col items-center'>
                <Pie  data={dataChart} options={options} />
            </div>
            : <div className='flex items-center justify-center'><Spinnner /></div> 
        }
    </div>
)
}
