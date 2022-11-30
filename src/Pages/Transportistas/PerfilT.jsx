
import React, { useEffect, useState } from 'react';
import { Contrato } from '../../Components/productores/Contrato';
import { Ganancias } from '../../Components/productores/Ganancias';
import { Formulario } from '../../Components/transportistas/Formulario';
import {obtenerContrato, obtenerEnviosCompletados} from '../../Helpers/getTransportista';
import useAuth from '../../Hooks/useAuth';

const PerfilT = () => {
    const {auth, config} = useAuth();
    const [contrato, setContrato] = useState({});
    const [cargando, setCargando] = useState(false);
    const [envios, setEnvios] = useState([])




    useEffect(() => {
        const cargarDatos = async() =>{
            setCargando(true)

            // const resp = await traerDatos(config);
            // setFormValues({
            //     tamano: resp.TAMANO || '',
            //     capacidad: resp.CAPACIDAD || '',
            //     carga: resp.CARGA || '',
            //     refrigeracion: resp.REFRIGERACION || '',
            //     precio: resp.PRECIO || ''
            // })
            const contratoR = await obtenerContrato(config);
            setContrato(contratoR);
            const enviosR = await obtenerEnviosCompletados(config);
            setEnvios(enviosR);
            setCargando(false)

        } 
        cargarDatos();
    }, []);
    
    const {SUELDO} = contrato;
    const ganancia = Number(SUELDO).toLocaleString("es-CL", {style: "currency", currency:"CLP"})
return (
    <div className='flex flex-col gap-4 justify-center items-center pt-4 mb-12  mx-auto '>
        <div className='flex 2xl:flex-row gap-4 flex-col 2xl:justify-center 2xl:items-start items-center 2xl:gap-2 mb-2'>
                <Ganancias ganancia={ganancia} envios={envios}  sueldo={SUELDO} cargando={cargando} rol="transportista"/>

                <Contrato contrato={contrato}/>
        </div>

        <Formulario auth={auth} config={config}/>

    </div>
  )
}

export default PerfilT