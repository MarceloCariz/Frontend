import React, { useEffect,  useState } from 'react'
import { GraficoArea } from '../../Components/consultor/GraficoArea'
import { GraficoEstadoPago } from '../../Components/consultor/GraficoEstadoPago'
import { GraficoPie } from '../../Components/consultor/GraficoPie'
import { obtenerDatosGraficos } from '../../Helpers/getConsultor'

const InicioConsultor = () => {
  const [datos, setDatos] = useState({})
  useEffect(() => {
    const cargarDatosGraficos = async () =>{
      const respuesta = await obtenerDatosGraficos();
      setDatos(respuesta);
    }

    cargarDatosGraficos();

  }, [ datos.length]);

  return (
    <div >
      <h3 className='text-center font-bold text-4xl '>Graficos</h3>
      <div className='flex items-center justify-end'>
          <button className='px-4 py-2 bg-blue-500 text-white mt-2'>Generar PDF</button>
      </div>
      <div className='grid sm:grid-cols-3 justify-items-center sm:gap-2 gap-10  pt-12 min-w-full '>

        <div className='  w-2/3 '>
          <h2 className='text-center'>Compras por Tipo cliente</h2>
          
            <GraficoPie tipoVenta={datos.tipoVenta}/>
            
        </div>
        <div className='w-full h-full'>
          <h2 className='text-center'>Compras por Mes</h2>

            <GraficoArea comprasPorMes={datos.comprasPorMes}/>

        </div>
        <div className='  w-full   '>
          <h2 className='text-center'>Estados de Pagos</h2>
          <GraficoEstadoPago estadoPago={datos.estadoPago}/>
        </div>
        {/* <div className='  w-full   '>
          <h2 className='text-center'>Estados de Pagos</h2>
          <GraficoEstadoPago estadoPago={datos.estadoPago}/>


        </div> */}
        
      </div>
    </div>
  )
}

export default InicioConsultor