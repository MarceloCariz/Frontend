

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useConsultas from '../../../Hooks/useConsultas'

export const Buscador = () => {
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const {productos,setProductos,productosBackup} = useConsultas();
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const onChange = ({target}) =>{
        // filtrar(target.value);
        setTerminoBusqueda(target.value);
        if(pathname !== '/inicio') return;
        if( target.value === '' ) return setProductos(productosBackup);
        filtrar();
    }

    const filtrar = () => {

        if (!productos) {
            return;
        }
        let resultadoBusqueda = productosBackup.filter((elemento) => {
            // if (elemento.NOMBRE.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
            //     return elemento
            // }
            const resultado = elemento.NOMBRE.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            // console.log(elemento)
            return resultado;
        });
        // if(resultadoBusqueda.length === 0 ) return;
        // setResultadoBusqueda(resultadoBusqueda);
        setProductos(resultadoBusqueda);
    }
    const handleSearch = (e) =>{
        e.preventDefault();
        if(pathname === '/inicio' || terminoBusqueda === '') return;
        // setProductos(resultadoBusqueda);
        filtrar();
        navigate(`resultado/${terminoBusqueda}`);
        setTerminoBusqueda('');

        // if
    }
  return (
        <form className='text-black flex  items-center gap-2' onSubmit={handleSearch}>
            <FontAwesomeIcon className='sm:text-white lg:block hidden lg:text-2xl ' icon={faSearch}/>
            <input onChange={onChange} value={terminoBusqueda} type="text" placeholder='Busca tu producto...' className='w-full  lg:h-10 lg:text-base md:text-2xl md:h-20 h-12 pl-2 sm:border-none sm:shadow-none  border  shadow-lg'/>
        </form>
  )
}
