
import React, { useEffect } from 'react';
import { Contrato } from '../../Components/productores/Contrato';
import { Ganancias } from '../../Components/productores/Ganancias';
import { Formulario } from '../../Components/transportistas/Formulario';
import { Spinnner } from '../../Components/ui/Spinnner';
import useAuth from '../../Hooks/useAuth';
import useConsultas from '../../Hooks/useConsultas';

const PerfilT = () => {
    const {auth, config} = useAuth();

    const {cargarDatosTransportistas, contratoT:contrato, enviosCompletadosT:envios, cargando} = useConsultas();

    useEffect(() => {
        cargarDatosTransportistas();
    }, [config]);
    
return (
    <div className='flex flex-col gap-4 justify-center items-center pt-4 pb-12  mx-auto '>
        <div className='flex 2xl:flex-row gap-4 flex-col 2xl:justify-center 2xl:items-start items-center 2xl:gap-2 mb-2'>
                {
                    cargando ? <Spinnner/> : (contrato) &&
                    <>
                        <Ganancias ganancia={Number(contrato.SUELDO || 0).toLocaleString("es-CL", {style: "currency", currency:"CLP"})} 
                        envios={envios}  sueldo={contrato.SUELDO || 0} cargando={cargando} rol="transportista"/>

                        <Contrato contrato={contrato}/>
                    </>
                }

        </div>

        <Formulario auth={auth} config={config}/>

    </div>
  )
}

export default PerfilT