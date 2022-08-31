import React, { useEffect, useState } from 'react'
import { obtenerPedidos } from '../Helpers/getClientes';
import useAuth from '../Hooks/useAuth'

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([])
    const {config, auth} = useAuth();
    
    useEffect(() => {
        const cargarPedidos = async()=>{
            const resultado = await obtenerPedidos(config);
            resultado.map((ele,i)=>(console.log(ele.activos)))
            
            setPedidos(resultado);
        }

        cargarPedidos()
    }, [])
  return (
    <div className=''>
      <p className='text-2xl text-center'>Pedidos</p>
    <div className='flex justify-center flex-col items-center mx-auto pt-12'>

      {
        pedidos.length > 0 ?  
        pedidos.map((ele, i)=>(
          <div className='w-2/5 flex flex-col text-left justify-center items-center mb-4 rounded-lg bg-white shadow-xl px-4 py-4'>
            <div className='flex gap-2 text-xl capitalize font-semibold items-center '>
              <p>Numero pedido <span className='text-black font-bold'>#{i}</span> </p>
              <p className='bg-gray-200 px-2 py-2 rounded-lg'>{ele[0].ESTADO_ENVIO}</p>
              
            </div>
            <p className='font-semibold   '>Fecha de compra: {ele[0].FECHA_COMPRA}</p>


            {
              ele.map((e)=>(
                <div className='flex gap-12 mt-4'>
                  <table className='flex flex-col gap-2'>
                    <thead>
                      <tr className='flex  justify-between gap-12 text-center    items-center text-sm'>
                        <th>Nombre Producto </th>
                        <th>Cantidad </th>
                        {/* <th>Fecha Compra </th> */}


                      </tr>
                    </thead>
                    <tbody>
                      <tr className='flex  justify-between  text-center    items-center text-sm'>
                        <tr>{e.NOMBRE_PRODUCTO}</tr>
                        <tr>{e.CANTIDAD}</tr>

                      </tr>
                    </tbody>
                  </table>
              
                  {/* <p>{e.ESTADO_ENVIO}</p> */}
                </div>
                ))
            }
    
          </div>

          ))
          
        :'Aun no hay pedidos'
      }

    </div>
    </div>
  )
}

export default Pedidos