import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";

const Carrito = () => {
  const { carrito, setCarrito } = useAuth();
  const [total, setTotal] = useState(0)
  // const local = localStorage.getItem('carrito')
    useEffect(() => {
        localStorage.setItem('carrito',JSON.stringify(carrito))
        const montoTotal = carrito.reduce((total, i)=>(i.PRECIO * i.unidad) + total, 0 );
        
        setTotal(montoTotal)
      


        if(carrito.length === 0){
            return
        }
   

    }, [carrito])


    const handleClick = (e) =>{
      
        // const existe = carrito.some(p => p.ID === e.ID);
        // if(existe){
        //     const nuevos = carrito.map(p =>{
        //         if(p.ID ===e.ID && e.unidad === 1){
        //            return carrito.filter(({ID})=>(ID !== e.ID))
        //         }
        //         else if(p.ID ===e.ID){
        //             p.unidad--;
        //             return p;
        //         }else{
        //             return p
        //         }
        //     })
        //     setCarrito([...nuevos])
        // }
        const filtrado = carrito.filter(({ID})=>{
            return  ID !== e.ID  ;
        })
        // console.log(filtrado)
        setCarrito(filtrado)
        
    }
  return (
    <div className=" mt-12 flex justify-center flex-col items-center">
      <p className="text-center text-2xl font-semibold">Resumen del Pedido</p>
      <table className="mt-4 w-1/2 flex flex-col  capitalize" >
      <thead className="" >
        <tr className=" flex  justify-between ">
          <th>Nombre</th>
          <th>Stock</th>
          <th >Precio</th>
          <th>Unidad</th>
          <th>Eliminar</th>


        </tr>
      </thead>
      <tbody >

      {carrito.length > 0
        ? carrito.map(({ ID, NOMBRE, CANTIDAD, PRECIO , unidad}, indice) => (
            <tr className="flex  justify-between mt-2" key={indice}>
                <td>{NOMBRE}</td>
                <td>{CANTIDAD}</td>
                <td>{PRECIO}</td>
                <td>
                  {unidad}
                  
                  </td>
                <td className="cursor-pointer bg-red-600 text-white rounde-sm px-2" onClick={(e)=>handleClick({ID},e)}>X</td>
            </tr>
          ))
        : "Agrega productos a tu carrito"}
        </tbody>
   


    </table>
    <div className="w-1/2 flex flex-row bg-gray-300 mt-4 px-4 rounded-sm mb-4">
            <p className="w-full">Total</p>
            <p className="text-right font-semibold"> ${total}</p>
    </div>
            <button className="bg-green-500 px-4 py-2 rounded-sm text-white font-semibold">Hacer Pedido</button>


    </div>
  );
};

export default Carrito;
