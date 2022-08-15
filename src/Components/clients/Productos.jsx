import React, { useEffect } from 'react'
import useAuth from '../../Hooks/useAuth'
import fotoPrueba from './img/FrenteAVaras.png'
const Productos = ({productos}) => {
    const {carrito, setCarrito} = useAuth();
    

    useEffect(() => {
        localStorage.setItem('carrito',JSON.stringify(carrito))
    
    }, [carrito])
    const handleClick = (producto) =>{
        setCarrito([...carrito, producto])

       
    }

  return (
    <div className='mt-12 grid md:grid-cols-6 gap-7 '>
        {productos.length > 0 && 
            productos.map(({ID, NOMBRE, CANTIDAD, PRECIO})=>(
                <div className='bg-gray-500 rounded-lg pb-4 shadow-lg text-white ' key={ID}>
                    <img className='object-cover rounded-lg  w-full h-32' src={fotoPrueba} alt="" />

                    <div className='px-4 text-lg capitalize'>
                    <p className='font-semibold text-2xl'>{NOMBRE}</p>
                    <p>stock: {CANTIDAD}</p>
                    <p>precio: {PRECIO}</p>
                    </div>
                    <div className='flex justify-center mt-4 '>
                    <button onClick={(e) => handleClick({ID,NOMBRE, CANTIDAD, PRECIO},e)} className='bg-blue-600 px-2 py-2 rounded-md'>Agregar al carrito</button>

                    </div>

                </div>
            ))
        }

    </div>
  )
}

export default Productos