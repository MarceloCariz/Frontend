import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { confirmarRecepcionLocal } from '../../../Helpers/getClientes';

export const BotonRecibido = ({referencia_compra}) => {
    const confirmarRecepcion = async() =>{
        const respuesta = await confirmarRecepcionLocal(referencia_compra);
        console.log(respuesta)
        window.location.reload();
     }
  return (
    <button onClick={confirmarRecepcion}  className="bg-emerald-600 px-4 py-2 text-xl text-white flex items-center gap-2 motion-reduce:animate-pulse">
    <FontAwesomeIcon className="animate-pulse" icon={faCheckCircle}/>
    confirmar recepcion del pedido</button>
  )
}
