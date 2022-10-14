import React, { useEffect, useState } from 'react'
import { Contrato } from '../../Components/productores/Contrato';
import { Ganancias } from '../../Components/productores/Ganancias';
import { obtenerContrato,  obtenerEnviosCompletados, } from '../../Helpers/getProductores';
import useAuth from '../../Hooks/useAuth'

const PerfilP = () => {
    const {config} = useAuth(); 
    const [contrato, setContrato] = useState({});
    const [cargando, setCargando] = useState(false)

    const [envios, setEnvios] = useState([]);
    useEffect(() => {
        const cargarDatos = async() =>{
            setCargando(true)
            const contratoR = await obtenerContrato(config);
            setContrato(contratoR);
            const respuesta = await obtenerEnviosCompletados(config);
            setEnvios(respuesta)
            setCargando(false)
            // const recibidos = respuesta.filter((e)=>(e.map(({ESTADO_ENVIO})=>(ESTADO_ENVIO))=== 'recibido'));
            // console.log(respuesta.filter((e)=>(e.map(({ESTADO_ENVIO})=>(ESTADO_ENVIO))=== 'recibido')));
        }  
        cargarDatos();
    }, [config])
    const {SUELDO} = contrato;
    const ganancia = Number(SUELDO).toLocaleString("es-CL", {style: "currency", currency:"CLP"})
    // date.toLocaleDateString('es-MX', {weekday:'long')

  return (
    <div className='flex justify-center  items-center flex-col gap-10'>

       <Ganancias ganancia={ganancia} envios={envios} sueldo={SUELDO} cargando={cargando} rol="productor"/>

        <Contrato contrato={contrato}/>
    </div>
  )
}

export default PerfilP