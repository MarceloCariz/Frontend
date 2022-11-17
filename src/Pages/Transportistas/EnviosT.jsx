import React, { useEffect } from 'react'
import CardEnviado from '../../Components/transportistas/CardEnviado';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spinnner } from '../../Components/ui/Spinnner';
import useAuth from '../../Hooks/useAuth'
import useConsultas from '../../Hooks/useConsultas';
const EnviosT = () => {
  const {config} = useAuth();
    // const [envios, setEnvios] = useState([])
    const {cargarEnviosTransportista, enviosT, cargando} = useConsultas();
    useEffect(() => {
      cargarEnviosTransportista();
    }, [config])
    

  return (
    <div className='container'>
    <h3 className='text-center sm:mb-12 mb-10  font-semibold text-4xl'>
      <FontAwesomeIcon className='pr-2' icon={faBookmark}/>
      Envíos </h3>
    <div className='mx-auto flex flex-col items-center justify-center pt-4'>
        <h2 className='mb-4 sm:hidden block text-2xl font-semibold'>Envios</h2>
        {cargando && enviosT.length === 0 && (<Spinnner/>)}
        {enviosT.length > 0 ? 
            enviosT.map((ele)=>(
                <CardEnviado key={ele[0].REFERENCIA_COMPRA} ele={ele} config={config}/>

            ))
            
        : !cargando && 'Aún no tiene envíos'}
         </div>
    </div>
  )
}

export default EnviosT