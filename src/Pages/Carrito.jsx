import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { traerDatos } from "../Helpers/getClientes";
import useAuth from "../Hooks/useAuth";

const Carrito = () => {
  const { carrito, setCarrito, config } = useAuth();
  const [total, setTotal] = useState(0)
  const [formValues, setFormValues] = useState(
    {
        direccion: '',
        ciudad: '',
        pais: '',
    }
)
    useEffect(() => {
        localStorage.setItem('carrito',JSON.stringify(carrito))
        const montoTotal = carrito.reduce((total, i)=>(i.PRECIO_LOCAL * i.unidad) + total, 0 );
        setTotal(montoTotal)
        if(carrito.length === 0){
            return
        }
        const cargarDatos = async() =>{
          const resp = await traerDatos(config);
          setFormValues({
              direccion: resp.DIRECCION || '',
              ciudad: resp.CIUDAD || '',
              pais: resp.PAIS || ''
          })
        } 
      cargarDatos();

    }, [carrito, config])
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
    <div className=" mt-12 flex justify-center flex-col items-center sm:mb-0 mb-60">

      <p className="text-center text-3xl font-semibold">Resumen del Pedido</p>
      {carrito.length > 0 ? 

      <table className="mt-10 sm:w-1/2 w-5/6 flex flex-col  capitalize" >
      <thead className="" >
        <tr className=" flex  justify-between  text-center    items-center text-sm  ">
          <th className="sm:mr-14 mr-6">Imagen</th>
          <th className="sm:mr-10 mr-10">Nombre</th>
          {/* <th>Stock</th> */}
          <th className="sm:mr-0 mr-2">Precio</th>
          <th className="sm:mr-0 mr-2">Cantidad</th>
          <th className="">Eliminar</th>


        </tr>
      </thead>
      <tbody >

      {carrito.length > 0
        && carrito.map(({ ID, NOMBRE, CANTIDAD, PRECIO_LOCAL , unidad, IMAGE_URL}, indice) => (
            <tr className="flex  sm:justify-between justify-between  mt-2 items-center" key={indice}>
                <th>
                  <img className="object-contain sm:w-16 w-12 sm:h-16 h-12" src={IMAGE_URL} alt="imagen" />
                </th>
                <td>{NOMBRE}</td>
                {/* <td>{CANTIDAD}</td> */}
                <td>{PRECIO_LOCAL}</td>
                <td>
                  {unidad}
                  
                  </td>
                <td className="cursor-pointer bg-red-600 text-white rounde-sm px-2" onClick={(e)=>handleClick({ID},e)}>X</td>
            </tr>
          ))
        }
        </tbody>
   


    </table>
   : 'Agrega Productos'}
    <div className="w-1/2 flex flex-row bg-gray-300 mt-4 px-4 rounded-sm mb-4">
            <p className="w-full">Total</p>
            <p className="text-right font-semibold"> ${total}</p>
    </div>
    {/* INFROMACION DESPACHO */}
    <div className="mt-4 mb-8 sm:w-1/2 flex flex-col items-center border border-1 border-gray-500 py-2 px-4 sm:px-2 rounded-md">
       <h2 className="text-xl font-semibold text-center">INFORMACION DESPACHO</h2>
       <div className="flex flex-col gap-2 mt-2 text-lg sm:w-1/3">
          <p className="font-medium">Direccion: <span className="capitalize font-normal">{formValues.direccion}</span> </p>
          <p className="font-medium">Ciudad: <span className="capitalize font-normal">{formValues.ciudad}</span></p>
          <p className="font-medium">Pais: <span className="capitalize font-normal">{formValues.pais}</span></p>
       </div>
       <Link to="/inicio/perfil"  className='text-white bg-blue-500 px-4 py-2 mt-2 text-sm'>Actualizar Informacion</Link>
    </div>
    
    <button disabled={carrito.length === 0 ? true : false} className={ carrito.length === 0 ? "bg-red-500 px-4 py-2 rounded-sm text-white font-semibold text-xl" :
  "bg-green-500 px-4 py-2 rounded-sm text-white font-semibold text-xl"
  }>
      {carrito.length > 0 ? "Hacer Pedido" : "Agrega Productos al Carrito"}
      </button>
         

    </div>
  );
};

export default Carrito;
