import React from 'react'
import useAuth from '../../Hooks/useAuth'

export const CarritoHover = ({carrito,handleHoverCarrito}) => {
  // console.log(carrito)
  const {auth} = useAuth();
  return (
    <div onMouseEnter={handleHoverCarrito} className="bg-white h-auto w-auto absolute top-24 right-52 ml-12 text-black shadow-xl rounded-lg pb-2 ">

    {carrito.length > 0 ? (
    <>
    <p className="  text-center font-semibold">Productos</p>
    <div className="px-4 flex flex-col items-center py-4">
      <div className="flex gap-2 text-md justify-between w-full font-semibold">
        <p>Imagen</p>
        <p>Nombre</p>
        <p>Calidad</p>
        <p>Cantidad</p>
        <p>Precio</p>
      </div>
        {carrito.map(({ID, NOMBRE, IMAGE_URL, unidad, CALIDAD, PRECIO})=>(
        <div key={ID} className="flex text-md  items-center w-full justify-between mt-1" >
            <img className="w-12 h-8 object-contain" src={IMAGE_URL} alt="imagen producto" />
            <p className="">{NOMBRE}</p>
            <p className='mr-2'>{CALIDAD}</p>
            <p className="">{unidad}</p>
            <p>{(PRECIO * unidad).toLocaleString("es-CL", {style: "currency", currency:"CLP"})}</p>
        </div>
        ))}
        <p className='mt-2 font-semibold'>
          {auth.TIPO_CLIENTE === "externo" ? "Total aprox:" : "Total"} {carrito.reduce((total, i)=>(i.PRECIO * i.unidad) + total, 0 ).toLocaleString("es-CL", {style: "currency", currency:"CLP"})}</p>
    </div>
    </>
    ): <p className="px-2">Carrito Vacío</p>}
</div>

  )
}
