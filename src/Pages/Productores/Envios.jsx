import React, { useEffect, useState } from 'react'
import CardEnvio from '../../Components/productores/CardEnvio';
import { Spinnner} from '../../Components/ui/Spinnner';
import { obtenerEnvios } from '../../Helpers/getProductores';
import useAuth from '../../Hooks/useAuth'

const Envios = () => {
  const {config} = useAuth();
    const [envios, setEnvios] = useState([]);
    const [cargando, setCargando] = useState(false)
    useEffect(() => {
        const cargarEnvios = async() =>{
          setCargando(true)
            const respuesta = await obtenerEnvios(config);
            setEnvios(respuesta)
            setCargando(false)
        }

        cargarEnvios();
    }, [config])
    

  return (
    <div className='mx{-auto flex flex-col items-center justify-center pt-12'>
        {cargando && <Spinnner/>}
        {envios.length > 0 && !cargando ? 
            envios.map((ele)=>(

                <CardEnvio key={ele[0].REFERENCIA_COMPRA} ele={ele} config={config}/>

            ))
            
        : cargando ? '' : 'Aún no tienes envíos'}
    </div>
  )
}

export default Envios