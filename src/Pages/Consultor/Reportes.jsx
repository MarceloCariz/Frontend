import React, { useState } from 'react'
import { useEffect } from 'react'
import { CardReporte } from '../../Components/consultor/CardReporte';
import { listarReportes } from '../../Helpers/getConsultor'

const Reportes = () => {
  const [reportes, setReportes] = useState([]);
  useEffect(()=>{
    const cargarReportes = async()=>{
      const respuesta = await listarReportes();
      console.log(respuesta)
      setReportes(respuesta);
    }
    cargarReportes();
  },[])
  return (
    <div>
      <h3>Reportes</h3>
      <div className='flex justify-center container gap-2 flex-wrap '>
          {reportes.length > 0 ? reportes.map((reporte)=>(
            <CardReporte key={reporte.ID_REPORTE} {...reporte} />
          )): 'No hay reportes'}
      </div>
    </div>
  )
}

export default Reportes