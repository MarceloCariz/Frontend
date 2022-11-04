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
    <div className='mx{-auto flex flex-col items-center justify-center pt-12'>
        {cargando && <Spinnner/>}
        {enviosP.length > 0  ? 
            enviosP.map((ele)=>(

                <CardEnvio key={ele[0].REFERENCIA_COMPRA} ele={ele} config={config}/>

            ))
            
        : !cargando && 'Aún no tienes envíos'}
    </div>
  )
}

export default Envios