import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { confirmarRecepcionLocal } from '../../../Helpers/getClientes';
import useConsultas from '../../../Hooks/useConsultas';
import { Spinnner } from '../../ui/Spinnner';

export const BotonRecibido = ({referencia_compra}) => {
    const {cargarPedidos, cargando} = useConsultas();
    const confirmarRecepcion = async() =>{
        const respuesta = await confirmarRecepcionLocal(referencia_compra);
        console.log(respuesta)
        cargarPedidos();
     }
  return (
    <button onClick={confirmarRecepcion}  className="bg-emerald-600 px-4 py-2 text-xl text-white flex items-center gap-2 motion-reduce:animate-pulse">
    {cargando ? <Spinnner/> : <FontAwesomeIcon className="animate-pulse" icon={faCheckCircle}/> }
    {cargando ? "Confirmando Recepcion del pedido ... " : "Confirmar recepción del pedido"}</button>
  )
}
