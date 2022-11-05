

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import useConsultas from '../../../Hooks/useConsultas'

export const Buscador = () => {
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const {productos,setProductos,productosBackup} = useConsultas();

    const onChange = ({target}) =>{
        // filtrar(target.value);
        setTerminoBusqueda(target.value);
        if( target.value.length === 0) return setProductos(productosBackup);
        filtrar();
    }

    const filtrar = () => {

        if (!productos) {
            return;
        }
        let resultadoBusqueda = productos.filter((elemento) => {
            if (elemento.NOMBRE.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento
            }
        });
        if(resultadoBusqueda.length === 0) return;
        // setResultadoBusqueda(resultadoBusqueda);
        setProductos(resultadoBusqueda);
    }
  return (
    <div className='  text-black flex  items-center gap-2 '>
        <FontAwesomeIcon className='sm:text-white sm:block hidden sm:text-2xl' icon={faSearch}/>
        <input onChange={onChange} value={terminoBusqueda} type="text" placeholder='Busca tu producto ...' className='w-full  sm:h-10 h-12 pl-2 sm:border-none sm:shadow-none  border  shadow-lg'/>
    </div>
  )
}
