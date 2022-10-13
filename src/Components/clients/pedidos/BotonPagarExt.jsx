import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react'
import { pagarPedido } from '../../../Helpers/getClientes';

export const BotonPagarExt = ({referencia_compra, total, config}) => {
    const [tokentbk, setTokentbk] = useState({token: '', url:''});
    const [cargando, setCargando] = useState(false);

    const inputtbk = useRef();
    const formAction = useRef();
    const handleEnviarPedido = async(e) =>{
        e.preventDefault();
        const respuesta =  await pagarPedido(referencia_compra , config, total);
        const { token, url} = respuesta;

  
        formAction.current.action = url;
        formAction.current.method= "POST";
  
        inputtbk.current.value = token;
        setTokentbk({token: token, url: url});
  
        setCargando(false)
  
        formAction.current.submit();
     }
  return (

        <form   ref={formAction} onSubmit={handleEnviarPedido}    >
        <input ref={inputtbk} type="hidden"  name="token_ws"   value={`${tokentbk.token}`}/>

          <div className="flex items-center">
            {cargando && 
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
            }
            <button type="submit"   className="bg-emerald-600 px-4 py-2 text-xl text-white flex items-center gap-2 motion-reduce:animate-pulse">
                <FontAwesomeIcon className="animate-pulse" icon={faCheckCircle}/>
                Pagar Pedido</button>
          </div>
      </form>
  )
}
