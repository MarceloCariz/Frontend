import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import useAuth from '../../Hooks/useAuth';
import useTime from '../../Hooks/useTime';

const Subastas = () => {
  const {productos, auth} = useAuth();
  // const [hora, setHora] = useState('')
  const [finalHora, setFinalHora] = useState(1);
  // const [minutos, setMinutos] = useState(0)

    let activo = true;
    // let  socket;
    const  socket = activo && io('http://localhost:4000', {reconnection: false});
    const {minutos, hora, resultado} = useTime(finalHora, socket, activo, auth);

  useEffect(() => {
   
    let fecha = new Date("2022-08-30T00:32:20.00");
    // desde la orden de compra recibo la fecha con los minutos
    // const fecha2 = fecha.setMinutes(fecha.getMinutes());
    console.log(fecha)
    setFinalHora(fecha );
    // console.log(fecha.getMinutes() * 60)

    // console.log(new Date(fecha2).getMinutes())
 
  
  }, [])

  // useEffect(() => {
  //   const cargarHora = ()=>{
  //     const horaActual = new Date();
  //     setHora(horaActual.toLocaleTimeString())
  //       if(finalHora - horaActual > 0){
  //         const minutosF = (finalHora  - horaActual)/(1000*60)
  //         setMinutos(minutosF )
  //       }
     
   
  //   }
  //   console.log(minutos)
  //   if(minutos.toFixed(2) <= 0.01 && minutos.toFixed(2) > -0.0 ){
  //     setMinutos(1);
  //     console.log('stop')
  //     socket.emit('subasta:finalizar', minutos)
  //     activo = false
  //     return
  //  }
  //  if(minutos < -0){
  //   return
  //  }
  //  if( minutos === 1){
  //   activo = false
  //    return
  //  } 

  //     setTimeout(()=>{
  //       cargarHora();
  //     },2000)


  // }, [hora])
 
  const handleClick = () =>{
    console.log(productos)

    socket && socket.emit('postular', productos)
  }
  console.log(minutos)
  return (
    <div className='mx-auto container text-center pt-10 '>
        <h1 className='text-3xl font-semibold'>Subasta Disponibles</h1>
        

        <div className='flex justify-center mt-12 gap-2'>
          <div className='border border-1 border-red-600 flex-1 '>
              <p>Prodcutos Necesarios</p>
              <button  disabled={minutos === null ? true : false} onClick={handleClick} className='bg-green-500 px-4 py-2 text-white'>POSTULAR</button>
              <p>{minutos === null  ? "" :  hora}</p>
              <p>{minutos === null ? "Subasta Finalizada" : minutos.toFixed(0)+" minutos para finalizar"} </p>
              <p className='bg-gray-400 px-2 '>Tus productos Seleccionados</p>
              <div className='flex '>
              {resultado.length > 0 && (

                resultado.map((producto)=>(
                  <div className='text-center  mb-4 ' key={producto.ID_PRODUCTO}>
                    <p>Nombre: {producto.NOMBRE}</p>
                    <p>Precio_exp: {producto.PRECIO_EXP}</p>
                    <hr  className=''/>
                  </div>
                ))
              )}
              </div>
          </div>

          <aside>
            <p>Mis productos</p>
            <hr className='h-2'/>        
            {
              productos.length > 0 ? productos.map((producto)=>(
                  <div key={producto.ID_PRODUCTO} className="flex gap-2 capitalize">
                    <img className='object-contain w-12 h-12' src={producto.IMAGE_URL} alt="" />
                      <p>{producto.NOMBRE}</p>
                      <p>{producto.CANTIDAD}</p>

                      {/* <button onClick={(e)=>handleClick(producto,e)}>Enviar</button> */}
                  </div>
               )):'no'
            }
          </aside>

        </div>

        {/* {
            productos.length > 0 ? productos.map((producto)=>(
                <div key={producto.ID_PRODUCTO}>
                    <button onClick={(e)=>handleClick(producto,e)}>Enviar</button>
                </div>
            )):'no'
        } */}
    </div>
  )
}

export default Subastas