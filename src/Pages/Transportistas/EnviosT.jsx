import React, { useEffect, useState } from 'react'
import CardEnviado from '../../Components/transportistas/CardEnviado';
import { obtenerEnvios } from '../../Helpers/getTransportista';
import useAuth from '../../Hooks/useAuth'

const EnviosT = () => {
  const {config} = useAuth();
    const [envios, setEnvios] = useState([])
    useEffect(() => {
        const cargarEnvios = async() =>{
            const respuesta = await obtenerEnvios(config);
            setEnvios(respuesta.sort())
        }

        cargarEnvios();
    }, [config])
    

  return (
    <div className='mx-auto flex flex-col items-center justify-center pt-12'>
        {envios.length > 0 ? 
            envios.map((ele)=>(

                <CardEnviado key={ele[0].REFERENCIA_COMPRA} ele={ele} config={config}/>

            ))
            
        : 'Aun no tiene envios'}
    </div>
  )
}

export default EnviosT