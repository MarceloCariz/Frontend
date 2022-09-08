import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { enviaPedidoExt, pagarPedido, traerDatos } from "../Helpers/getClientes";
import useAuth from "../Hooks/useAuth";

const Carrito = () => {
  const { carrito, setCarrito, config } = useAuth();
  const [tokentbk, setTokentbk] = useState({token: '', url:''});
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
        const filtrado = carrito.filter(({ID})=>{
            return  ID !== e.ID  ;
        })
        // console.log(filtrado)
        setCarrito(filtrado)
        
    }


    const navigate = useNavigate();
  // const handleEnviarPedido = async() =>{
  //   enviaPedidoExt(carrito, formValues.direccion, config);
  //   setCarrito([]);
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 2000);

  // }
    const inputtbk = useRef();
    const formAction = useRef();

  const onChange = ({target})=>{
    console.log(target.value)
  }
  const handleEnviarPedido = async(e) =>{
      // if(!inputtbk.current.value){
      //   return
      // }
      // consolde.log()
      e.preventDefault();
      const id_referencia = await enviaPedidoExt(carrito, formValues.direccion, config);

      const respuesta =  await pagarPedido(id_referencia , config, total);
      const { token, url} = respuesta;
      // console.log(respuesta)
      // inputtbk.current.value
      formAction.current.action = url;
      formAction.current.method= "POST";

      inputtbk.current.value = token;
      setTokentbk({token: token, url: url});
      // console.log(formAction.current.action)
      // console.log(inputtbk.current.value)
      setCarrito([]);

      formAction.current.submit();

      // console.log(formAction.current)
      // console.log(inputtbk.current)
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
          <th className="sm:mr-0 mr-2">Cantidad (kg)</th>
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
                  {unidad}  <span className="text-sm">kg</span> 
                  
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

    <form   ref={formAction} onSubmit={handleEnviarPedido}    >

      <input ref={inputtbk} type="hidden"  name="token_ws"   value={`${tokentbk.token}`}/>

      <input type="submit" disabled={carrito.length === 0 ? true : false} className={ carrito.length === 0 ? "bg-red-500 px-4 py-2 rounded-sm text-white font-semibold text-xl" :
  "bg-green-500 px-20 py-4 rounded-sm text-white font-semibold text-xl cursor-pointer"}
      value={carrito.length > 0 ? "Enviar Pedido" : "Agrega Productos al Carrito"}
      />
    </form>

         

    </div>
  );
};

export default Carrito;
