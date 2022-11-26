import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { confirmarRecepcionLocal } from '../../../Helpers/getClientes';
import useAuth from '../../../Hooks/useAuth';
import useConsultas from '../../../Hooks/useConsultas';
import { Spinnner } from '../../ui/Spinnner';

export const BotonRecibido = ({referencia_compra}) => {
    const [cargando, setCargando] = useState(false);
    const {auth} = useAuth();
    const {NOMBRE, CORREO} = auth;
    const {cargarPedidos} = useConsultas();

    const confirmarRecepcion = async() =>{
        setCargando(true);
        const respuesta = await confirmarRecepcionLocal(referencia_compra, NOMBRE, CORREO);
        console.log(respuesta)
        cargarPedidos();
        setCargando(true);
    }
  return (
    <button onClick={confirmarRecepcion}  className="bg-emerald-600 px-4 py-2 text-xl text-white flex items-center gap-2 motion-reduce:animate-pulse">
    {cargando ? <Spinnner/> : <FontAwesomeIcon className="animate-pulse" icon={faCheckCircle}/> }
    {cargando ? "Confirmando Recepcion del pedido ... " : "Confirmar recepción del pedido"}</button>
  )
}
