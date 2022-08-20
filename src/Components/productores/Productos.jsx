import React from 'react'


const Productos = ({producto}) => {
 const {CANTIDAD, NOMBRE, PRECIO} = producto;
  return (
    <div>
        <p>{NOMBRE}</p>
        <p>{CANTIDAD}</p>
        <p>{PRECIO}</p>

    </div>
  )
}

export default Productos