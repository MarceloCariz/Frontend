
import React, { useEffect } from 'react'
import useAuth from '../../Hooks/useAuth'
// import fotoPrueba from './img/FrenteAVaras.png'
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'




const Productos = ({productos, tipo}) => {

    const {carrito, setCarrito} = useAuth();
    const [agregando, setAgregando] = useState({cargando: false, id: ''})    
    const [activeButton, setActiveButton] = useState({activo: false,  id: ''})


    useEffect(() => {
        localStorage.setItem('carrito',JSON.stringify(carrito))
    }, [carrito])


    const handleClick = (producto) =>{        
        setAgregando({cargando:true,id: producto.ID})
        const existe = carrito.some(p => p.ID === producto.ID);
        if(existe){
            const nuevos = carrito.map(p =>{
                // console.log(p.unidad)
                if(p.ID ===producto.ID){
                    p.unidad++;
                    return p;
                }else{
                    return p
                }
            })
            setCarrito([...nuevos])

        }else{
            setCarrito([...carrito, producto])

        }
        setTimeout(() => {
            setAgregando({cargando:false,
                        id: ''})
        }, 1000);
    }

    const handleHover = (e) =>{
        setActiveButton({activo: true, id: e.ID});
    }

    const handleLeave = () =>{
        setActiveButton({activo: false, id: ''});
    }

return (
    <div  className='mt-12 grid md:grid-cols-6 sm:gap-7 justify-center  gap-2 grid-cols-2 sm:px-0 px-4 '>
        {productos.length > 0 && 
            productos.map(({ID_PRODUCTO:ID, NOMBRE, CANTIDAD, PRECIO_LOCAL, PRECIO_EXP ,IMAGE_URL , CALIDAD, PROVEEDOR, ID_PRODUCTOR})=>(
                <div onMouseEnter={(e)=> handleHover({ID},e)} onMouseLeave={handleLeave} className= 'h-auto bg-white rounded-lg pb-4 shadow-xl text-black sm:w-auto ' key={ID}>
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
                        activeButton.activo &&  activeButton.id === ID  && CANTIDAD > 0 && tipo === 'local' &&(
                            <button onClick={(e) => handleClick({ID,NOMBRE, CANTIDAD, PRECIO: tipo ==='local' ? PRECIO_LOCAL : PRECIO_EXP,IMAGE_URL, ID_PRODUCTOR, unidad: 1},e)} className='font-bold text-white bg-green-500 px-2 py-2 rounded-md'>
                            <FontAwesomeIcon icon={faCartPlus} className="pr-1"/>
                            {agregando.cargando && agregando.id === ID    ? "Agregando...": "Agregar al carrito"}</button>
                    )}
                    {
                        activeButton.activo &&  activeButton.id === ID   && tipo === 'externo' &&(
                            <button onClick={(e) => handleClick({ID,NOMBRE, CANTIDAD, PRECIO: tipo ==='local' ? PRECIO_LOCAL : PRECIO_EXP,IMAGE_URL, ID_PRODUCTOR, unidad: 1},e)} className='font-bold text-white bg-green-500 px-2 py-2 rounded-md'>
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
            ))
        }
    </div>
)}

export default Productos