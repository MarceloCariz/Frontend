import React from 'react'

export const CarritoHover = ({carrito,handleHoverCarrito}) => {
  return (
    <div onMouseEnter={handleHoverCarrito} className="bg-white h-auto w-46 absolute top-24 right-72 mr-6 text-black ">

    {carrito.length > 0 ? (
    <>
    <p className="bg-gray-700  text-center text-white">Productos</p>
    <div className="px-2">
      <div className="flex gap-2 text-sm">
        <p>Imagen</p>
        <p>Nombre</p>
        <p>Cantidad</p>
      </div>
        {carrito.map(({ID, NOMBRE, IMAGE_URL, unidad})=>(
        <div key={ID} className="flex text-sm gap-4 items-center mt-1" >
            <img className="w-12 h-10 object-contain" src={IMAGE_URL} alt="imagen producto" />
            <p className="w-12">{NOMBRE}</p>
            <p className="ml-4">{unidad}</p>
        </div>
        ))}
    </div>
    </>
    ): <p className="px-2">Carrito Vacio</p>}
</div>

  )
}
