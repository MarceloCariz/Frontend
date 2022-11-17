import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Spinnner } from '../ui/Spinnner';
// import { Box, Typography } from '@mui/material';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );


function GraficoStockProducto({stockProductosNombre}) {
  const LabelS = stockProductosNombre?.map(function(e) {
    return e.NOMBRE.toLowerCase();;
  });
  
  var DataS = stockProductosNombre?.map(function(e) {
    return e.TOTAL;
  });

  const data = {
    labels: LabelS,
    datasets: [
      {
        label: 'Stock de productos',
        data: DataS,
        backgroundColor: 'rgba(100, 200, 50 , 0.7)',
      }
    ],
  };

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

  return (
    <div>
    {DataS ?
        <div className='flex flex-col items-center'>
              <Bar style={{width: 600, height: 600}} data={data}  options={options} />

        </div>
        : <div className='flex items-center justify-center'><Spinnner /></div> 
    }
</div>
  )
}

export default GraficoStockProducto

