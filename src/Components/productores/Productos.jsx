import React from 'react'
import { obtenerProductos } from '../../Helpers/getProducts'
import useAuth from '../../Hooks/useAuth'

const Productos = ({productos}) => {
    console.log(productos)
 const {CANTIDAD, NOMBRE, PRECIO, ID} = productos;
  return (
    <div key={ID}>
        <p>{NOMBRE}</p>
        <p>{CANTIDAD}</p>
        <p>{PRECIO}</p>

    </div>
  )
}

export default Productos