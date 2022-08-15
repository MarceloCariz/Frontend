import React from 'react'
import useAuth from '../Hooks/useAuth'

const Carrito = () => {

    const {carrito} = useAuth();
    // const local = localStorage.getItem('carrito')
  return (
    <div className='bg-red-300 mt-4'>
        {carrito.length> 0 ? 
            carrito.map(({ID, NOMBRE, CANTIDAD, PRECIO},indice)=>(
                <div className='bg-red-300' key={indice}>
                <p>{NOMBRE}</p>

                    <p>{CANTIDAD}</p>
                    <p>{PRECIO}</p>
                </div>

            ))
        
        
        :'Agrega productos a tu carrito'}
    </div>
  )
}

export default Carrito