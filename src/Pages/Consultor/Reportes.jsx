import { faFileArchive } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react'
import { CardReporte } from '../../Components/consultor/CardReporte';
import useConsultas from '../../Hooks/useConsultas';
import Filtro from '../Consultor/Filtro';
const Reportes = () => {
  const {cargarReportes, reportes } = useConsultas();
  useEffect(()=>{
    cargarReportes();
    FiltroGeneral();
  },[])
  const FiltroGeneral = () => {
    reportes.length > 0 ? reportes.map((reporte)=>(
      //console.log("[ "+ reporte.ID_REPORTE + " | " + dateFormat(reporte.FECHA, "DD/MM/YYYY" ) + " ]"),
      console.log("[ "+ reporte.ID_REPORTE + " | " + reporte.FECHA + " ]")
      
    )): console.log('No hay reportes')
  }
  return (
    <div className='container'>
    <Filtro></Filtro>
      <h3 className='text-center sm:mb-12 mb-10  font-semibold text-4xl'>
        <FontAwesomeIcon className='pr-2' icon={faFileArchive}/>
        Reportes</h3>
      <div className='flex justify-center container gap-2 flex-wrap '>
      {/* <div className='grid grid-cols-4   '> */}
          {reportes.length > 0 ? reportes.map((reporte)=>(
            <CardReporte key={reporte.ID_REPORTE} {...reporte} />
          )): 'No hay reportes'}
      </div>
    </div>
  )
}

export default Reportes