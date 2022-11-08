import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useRef, useState } from 'react'

export const ProductoCard = ({producto, tipo,handleClick , agregando}) => {
    const estiloCardLocal= 'flex flex-col items-center max-h-96   hover:max-h-fit bg-white rounded-lg pb-4 shadow-xl text-black sm:w-auto ';
    const estiloCardExterno = 'flex flex-col items-center h-72  hover:h-fit bg-white rounded-lg pb-4 shadow-xl text-black sm:w-auto ';

    const [activeButton, setActiveButton] = useState({activo: false,  id: 0})
    
    const {ID_PRODUCTO:ID, NOMBRE, CANTIDAD, PRECIO_LOCAL, PRECIO_EXP ,IMAGE_URL , CALIDAD, PROVEEDOR, ID_PRODUCTOR} = producto;

    const idCard = useRef();
    const handleHover = (e) =>{
        if(e.ID !== Number(idCard.current.id)) return;
        setActiveButton({activo: true, id: e.ID});
    }

    const handleLeave = () =>{
        setActiveButton({activo: false, id: 0});
    }
  
    return (
    <div ref={idCard} id={ID} onMouseEnter={(e)=> handleHover({ID},e)} onMouseLeave={handleLeave} 
        className= { tipo === "local" ? estiloCardLocal : estiloCardExterno}>
                    <img className='object-contain rounded-lg  w-52 h-52' src={IMAGE_URL} alt="imagen" />

                    <div className='px-4 text-lg capitalize'>
                    <p className='font-semibold text-2xl'>{NOMBRE} Kg</p>
                    {tipo === 'local' ? (
                        <>
                            <p>Stock: {CANTIDAD}</p>
                            <p>calidad: {CALIDAD}</p>
                            <p>proveedor: {PROVEEDOR}</p>
                            <p className='font-bold sm:text-2xl '>Precio:{Number(PRECIO_LOCAL).toLocaleString("es-CL", {style: "currency", currency:"CLP"})}</p>
                        </>
                    ):
                        <p className='font-bold sm:text-xl '>Precio aprox:{Number(PRECIO_EXP).toLocaleString("es-CL", {style: "currency", currency:"CLP"})}</p>
                    }

                    </div>
                    
                    <div className='flex justify-center mt-4 ' >
                    
                    {
                        activeButton.activo &&  activeButton.id === ID && ID ===  Number(idCard.current.id) && CANTIDAD > 0 && tipo === 'local' &&(
                            <button onClick={(e) => handleClick({ID,NOMBRE, CANTIDAD, PRECIO: tipo ==='local' ? PRECIO_LOCAL : PRECIO_EXP,IMAGE_URL, ID_PRODUCTOR, CALIDAD, unidad: 1},e)} className='font-bold text-white bg-green-500 px-2 py-2 rounded-md'>
                            <FontAwesomeIcon icon={faCartPlus} className="pr-1"/>
                            {agregando.cargando && agregando.id === ID    ? "Agregando...": "Agregar al carrito"}</button>
                    )}
                    {
                        activeButton.activo &&  activeButton.id === ID   && tipo === 'externo' &&(
                            <button onClick={(e) => handleClick({ID,NOMBRE, CANTIDAD, PRECIO: tipo ==='local' ? PRECIO_LOCAL : PRECIO_EXP,IMAGE_URL, ID_PRODUCTOR, CALIDAD,unidad: 1},e)} className='font-bold text-white bg-green-500 px-2 py-2 rounded-md'>
                            <FontAwesomeIcon icon={faCartPlus} className="pr-1"/>
                            {agregando.cargando && agregando.id === ID    ? "Agregando...": "Agregar al carrito"}</button>
                    )}
                    {
                        CANTIDAD <= 0 && tipo === 'local' && (
                            <p className='bg-gray-500 text-white px-4 py-2'>Producto sin stock</p>
                        )
                    }                 
                    </div>
    </div>
  )
}
