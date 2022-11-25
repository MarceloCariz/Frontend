import { faFileArchive } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react'
import { CardReporte } from '../../Components/consultor/CardReporte';
import useConsultas from '../../Hooks/useConsultas';
const Reportes = () => {
  const {cargarReportes, reportes,setReportes , reportesBackup} = useConsultas();



  const tiposDeReportes = () =>{
    const tipos = [... new Set(reportesBackup.map(({TIPO_REPORTE})=>(TIPO_REPORTE)))];
    return tipos;
  }

  const onChangeTipo = ({target}) => {
    if(target.value === 'all') return setReportes(reportesBackup);
    const filtrado = reportesBackup.filter(({TIPO_REPORTE})=>(TIPO_REPORTE === target.value))
    setReportes(filtrado)
  }

  useEffect(()=>{
    cargarReportes();
  },[setReportes])


  return (
    <div className='container'>

      <div className='flex flex-col items-center sm:mb-12 mb-10'>
          <h3 className='text-center mb-4   font-semibold text-4xl'>
            <FontAwesomeIcon className='pr-2' icon={faFileArchive}/>
            Reportes
          </h3>

          <div className=''>
              <p>Seleccione el tipo de reporte que desea ver</p>
              <select className='h-12 w-full text-center' name="" id="" defaultValue="all"  onChange={onChangeTipo}>
                  <option value="all">Todos los Reportes</option>
                  {
                    tiposDeReportes().map((TIPO)=>(
                      <option key={TIPO} value={TIPO}>{TIPO}</option>
                    ))
                  }
                </select>
          </div>

      </div>


      <div className='sm:grid sm:grid-cols-5 flex  flex-col  gap-5  sm:w-full sm:px-0 px-12 justify-items-center  '>
      {/* <div className='grid grid-cols-4   '> */}
          {reportes.length > 0 ? reportes.map((reporte)=>(
            <CardReporte key={reporte.ID_REPORTE} {...reporte} />
          )): 'No hay reportes'}
      </div>
    </div>
  )
}

export default Reportes