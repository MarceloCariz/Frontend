import React, { useEffect } from 'react'
import { Contrato } from '../../Components/productores/Contrato';
import { Ganancias } from '../../Components/productores/Ganancias';
import { Spinnner } from '../../Components/ui/Spinnner';
import useConsultas from '../../Hooks/useConsultas';

const PerfilP = () => {
    const {cargarDatosProductor, contratoP:contrato, enviosCompletadosP:envios,cargando} = useConsultas();

    useEffect(() => {
      cargarDatosProductor();
    }, [])
    const {SUELDO} = contrato;
    const ganancia = Number(SUELDO).toLocaleString("es-CL", {style: "currency", currency:"CLP"})
    // date.toLocaleDateString('es-MX', {weekday:'long')

  return (
    <div className='flex justify-center  items-center flex-col gap-10'>
        {cargando ? <Spinnner/> : (contrato) &&
        <>
                <Ganancias ganancia={ganancia} envios={envios} sueldo={SUELDO} cargando={cargando} rol="productor"/>

                <Contrato contrato={contrato}/>
        </>

        }
    </div>
  )
}

export default PerfilP