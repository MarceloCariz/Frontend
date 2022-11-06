import React from 'react'

export const CarritoHover = ({carrito,handleHoverCarrito}) => {
  return (
    <div onMouseEnter={handleHoverCarrito} className="bg-white h-auto w-60 absolute top-24 right-72 mr-6 text-black shadow-lg rounded-md ">

    {carrito.length > 0 ? (
    <>
    <p className="bg-gray-700  text-center text-white">Productos</p>
    <div className="px-2 flex flex-col items-center ">
      <div className="flex gap-2 text-md justify-between w-full">
        <p>Imagen</p>
        <p>Nombre</p>
        <p>Cantidad</p>
      </div>
        {carrito.map(({ID, NOMBRE, IMAGE_URL, unidad})=>(
        <div key={ID} className="flex text-md  items-center w-full justify-between mt-1" >
            <img className="max-w-12 h-8 object-contain" src={IMAGE_URL} alt="imagen producto" />
            <p className="">{NOMBRE}</p>
            <p className="mr-10">{unidad}</p>
        </div>
        ))}
    </div>
    </>
    ): <p className="px-2">Carrito Vacio</p>}
</div>

  )
}
