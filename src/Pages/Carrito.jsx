import { faHandPointRight } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link,  } from "react-router-dom";
import { enviaPedidoExt, pagarPedido, traerDatos } from "../Helpers/getClientes";
import useAuth from "../Hooks/useAuth";

const Carrito = () => {
  const { carrito, setCarrito, config } = useAuth();
  const [tokentbk, setTokentbk] = useState({token: '', url:''});
  const [total, setTotal] = useState(0);
  const [cargando, setCargando] = useState(false)
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


  // const handleEnviarPedido = async() =>{
  //   enviaPedidoExt(carrito, formValues.direccion, config);
  //   setCarrito([]);
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 2000);

  // }
    const inputtbk = useRef();
    const formAction = useRef();


  const handleEnviarPedido = async(e) =>{
      // if(!inputtbk.current.value){
      //   return
      // }
      // consolde.log()
      e.preventDefault();
      setCargando(true)
      // return
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
      setCargando(false)

      formAction.current.submit();

      // console.log(formAction.current)
      // console.log(inputtbk.current)
  }
  return (
    <div className=" mt-12 flex justify-center flex-col items-center sm:mb-4 mb-60  ">
      {carrito.length > 0 ? (
       <>
      <p className="text-center text-3xl font-semibold">Resumen del Pedido</p>

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
        && carrito.map(({ ID, NOMBRE,  PRECIO_LOCAL , unidad, IMAGE_URL}, indice) => (
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
    <div className="w-1/2 flex flex-row bg-gray-300 mt-4 px-4 rounded-sm mb-4">
            <p className="w-full">Total</p>
            <p className="text-right font-semibold"> ${total}</p>
    </div>

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
     

      {/* <input type="submit" disabled={carrito.length === 0 ? true : false} className={ carrito.length === 0 ? "bg-red-500 px-4 py-2 rounded-sm text-white font-semibold text-xl" :
  "bg-green-500 px-20 py-4 rounded-sm text-white font-semibold text-xl cursor-pointer animate-spin "}
      value={carrito.length > 0 ? "Enviar Pedido" : "Agrega Productos al Carrito"}
      /> */}
      <button  type="submit" disabled={carrito.length === 0 ? true : false} className={ carrito.length === 0 ? "bg-red-500 px-4 py-2 rounded-sm text-white font-semibold text-xl" :
  "bg-green-500 px-20 py-4 rounded-sm text-white font-semibold text-xl cursor-pointer  "}>
        <div className="flex items-center">
        {cargando && 
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
        }


        {(carrito.length > 0 ? (cargando  ? "Enviando..." : 'Enviar Pedido' ) : "Agrega Productos al Carrito" )}

        </div>

      </button>
    </form>

         
    </>): 
      <div className="flex flex-col gap-4 items-center">
        <h3 className="text-3xl">Agrega productos a tu carrito</h3>
        <Link  className="px-4 py-2 text-white bg-slate-600 text-lg" to={'/inicio'}>
          <FontAwesomeIcon className="mr-2" icon={faHandPointRight}/>
          Volver al Inicio
        </Link>
      </div>
    }

    </div>
  );
};

export default Carrito;
<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>