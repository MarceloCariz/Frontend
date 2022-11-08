import { faFileArchive } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react'
import { CardReporte } from '../../Components/consultor/CardReporte';
import useConsultas from '../../Hooks/useConsultas';

const Reportes = () => {
  const {cargarReportes, reportes } = useConsultas();
  useEffect(()=>{
    cargarReportes();
  },[])
  return (
    <div className='container'>
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