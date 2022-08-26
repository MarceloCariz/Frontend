
import React, { useEffect } from 'react'
import useAuth from '../../Hooks/useAuth'
import fotoPrueba from './img/FrenteAVaras.png'
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
const Productos = ({productos}) => {
    const {carrito, setCarrito} = useAuth();
    const [agregando, setAgregando] = useState({cargando: false, id: ''})    
    const [activeButton, setActiveButton] = useState({activo: false,  id: ''})
    
    useEffect(() => {

        localStorage.setItem('carrito',JSON.stringify(carrito))
        console.log('agregue')


    
    }, [carrito])
    const handleClick = (producto) =>{
        
        
            setAgregando({cargando:true,
                          id: producto.ID})
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
        // setCarrito([...carrito, producto])
       
    }

    const handleHover = (e) =>{

        setActiveButton({activo: true, id: e.ID})
    }

    const handleLeave = () =>{
        setActiveButton({activo: false, id: ''})

    }

  return (
    <div  className='mt-12 grid md:grid-cols-6 sm:gap-7 justify-center  gap-2 grid-cols-2 sm:px-0 px-4 '>
        {productos.length > 0 && 
            productos.map(({ID_PRODUCTO:ID, NOMBRE, CANTIDAD, PRECIO_LOCAL})=>(
                <div onMouseEnter={(e)=> handleHover({ID},e)} onMouseLeave={handleLeave} className= 'h-72 bg-white rounded-lg pb-4 shadow-xl text-black sm:w-auto ' key={ID}>
                    <img className='object-cover rounded-lg  w-full h-32' src={fotoPrueba} alt="" />

                    <div className='px-4 text-lg capitalize'>
                    <p className='font-semibold text-2xl'>{NOMBRE}</p>
                    <p>stock: {CANTIDAD}</p>
                    <p>precio: {PRECIO_LOCAL}</p>
                    </div>
                    <div className='flex justify-center mt-4 ' >
                    {
                        activeButton.activo &&  activeButton.id === ID  &&(

                            <button onClick={(e) => handleClick({ID,NOMBRE, CANTIDAD, PRECIO_LOCAL, unidad: 1},e)} className='font-bold text-white bg-green-500 px-2 py-2 rounded-md'>
                            <FontAwesomeIcon icon={faCartPlus} className="pr-1"/>
                            
                            {agregando.cargando && agregando.id === ID    ? "Agregando...": "Agregar al carrito"}
                        
                        
                        </button>
                        )
                    }
                  
                    
                    </div>

                </div>
            ))
        }

    </div>
  )
}

export default Productos