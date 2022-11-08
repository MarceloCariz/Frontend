import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect} from 'react'
import CardEnvio from '../../Components/productores/CardEnvio';
import { Spinnner} from '../../Components/ui/Spinnner';
import useAuth from '../../Hooks/useAuth'
import useConsultas from '../../Hooks/useConsultas';

const Envios = () => {
    const {config} = useAuth();
    const {cargarEnviosProductor, cargando, enviosP} = useConsultas();
    useEffect(() => {
      cargarEnviosProductor();
    }, [config])
    

  return (
    <div className='mx-auto flex flex-col items-center justify-center pt-4'>
        <h3 className='text-3xl font-semibold mb-10'>
          <FontAwesomeIcon icon={faTruck} className="text-2xl mr-2 mt-1 "/>
          Envíos</h3>

        {cargando && enviosP.length === 0 && <Spinnner/>}
        {enviosP.length > 0  ? 
            enviosP.map((ele)=>(

                <CardEnvio key={ele[0].REFERENCIA_COMPRA} ele={ele} config={config}/>

            ))
            
        : !cargando && 'Aún no tienes envíos'}
    </div>
  )
}

export default Envios