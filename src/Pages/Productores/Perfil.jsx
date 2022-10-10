import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { obtenerContrato, solicitudContrato } from '../../Helpers/getProductores';
import useAuth from '../../Hooks/useAuth'

const PerfilP = () => {
    const {config} = useAuth(); 
    const [contrato, setContrato] = useState({});
    const [alerta, setAlerta] = useState('');
    useEffect(() => {
        const cargarDatos = async() =>{
            const contratoR = await obtenerContrato(config);
            setContrato(contratoR);
        }  
        cargarDatos();
    }, [config])
    const {ID_CONTRATO, FECHA_INICIO, FECHA_TERMINO,  ESTADO, RENOVACION} = contrato;
    // date.toLocaleDateString('es-MX', {weekday:'long')
    const handleSolicitud = async() =>{
        const  mensaje = await solicitudContrato(ID_CONTRATO);
        setAlerta(mensaje);
        setTimeout(() => {
            setAlerta('');
        }, 3000);
    }
  return (
    <div className='flex justify-center '>
        <div className='border border-1 px-4 py-2 '>
            <div className='flex items-center justify-center mb-4 gap-2'>
                <FontAwesomeIcon className='text-3xl' icon={faFileContract} />
                <h2 className='capitalize text-xl text-center font-semibold '>contrato</h2>
            </div>
            {alerta && <p className='bg-green-500 px-4 py-1 text-white text-center'>{alerta}</p>}
            {contrato ? (
                <div key={ID_CONTRATO}>
                    <p>Numero de contrato: #{ID_CONTRATO}</p>
                    <p>Fecha Inicio : { new Date(FECHA_INICIO).toLocaleDateString('es-MX', {year: 'numeric', month: 'long', day: 'numeric'}) }</p>
                    <p>Fecha Termino : { new Date(FECHA_TERMINO).toLocaleDateString('es-MX', {year: 'numeric', month: 'long', day: 'numeric'}) }</p>
                    <p>Estado: {ESTADO === 'TRUE' ? 'ACTIVO' : 'INACTIVO'}</p>
                    <div className='flex justify-center mt-2'>
                        <button disabled={ESTADO  === 'TRUE'  ? true : false } onClick={handleSolicitud}
                            className={ESTADO === 'FALSE' ? ' px-4 py-2 bg-green-500 text-white' : 'px-4 py-2 bg-gray-500/20 text-gray-500'}>
                            {RENOVACION === 'true' ? 'Renovacion ya solicitada' : 'Solicitar Renovacion'}
                        </button>
                    </div>

                </div>
            ) : 'Cargando'}
        </div>

    </div>
  )
}

export default PerfilP