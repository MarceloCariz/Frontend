import React, { useEffect, useState } from 'react'
import CardEnvio from '../../Components/productores/CardEnvio';
import { obtenerEnvios } from '../../Helpers/getProductores';
import useAuth from '../../Hooks/useAuth'

const Envios = () => {
  const {config} = useAuth();
    const [envios, setEnvios] = useState([])
    useEffect(() => {
        const cargarEnvios = async() =>{
            const respuesta = await obtenerEnvios(config);
            setEnvios(respuesta)
        }

        cargarEnvios();
    }, [config])
    

  return (
    <div className='mx-auto flex items-center justify-center pt-12'>
        {envios.length > 0 ? 
            envios.map((ele)=>(

                <CardEnvio key={ele[0]} ele={ele} config={config}/>

            ))
            
        : 'No'}
    </div>
  )
}

export default Envios