import React, { useEffect } from 'react'
import CardEnviado from '../../Components/transportistas/CardEnviado';
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
    <div className='mx-auto flex flex-col items-center justify-center pt-12'>
        {cargando && enviosT.length === 0 && (<Spinnner/>)}
        {enviosT.length > 0 ? 
            enviosT.map((ele)=>(
                <CardEnviado key={ele[0].REFERENCIA_COMPRA} ele={ele} config={config}/>

            ))
            
        : !cargando && 'Aún no tiene envíos'}
    </div>
  )
}

export default EnviosT