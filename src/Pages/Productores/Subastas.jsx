import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import CardSubasta from '../../Components/productores/CardSubasta';
import { obtenerSubastasActivas } from '../../Helpers/getProductores';
import useAuth from '../../Hooks/useAuth';
import useTime from '../../Hooks/useTime';

const Subastas = () => {
  const {productos, auth} = useAuth();
  // const [hora, setHora] = useState('')
  const [finalHora, setFinalHora] = useState('');
  const [subastas, setSubastas] = useState([])
  const [referenciaCompra, setReferenciaCompra] = useState(null)
  const [alerta, setAlerta] = useState({msg:'', id: 0})
  // const [minutos, setMinutos] = useState(0)

    let activo = true;
    // let  socket;
    const  socket = activo && io('http://localhost:4000', {reconnection: false});
    const {minutos, hora, resultado, } = useTime(finalHora, socket, activo, auth, referenciaCompra);

  useEffect(() => {
   
    // desde la orden de compra recibo la fecha con los minutos
    // const fecha2 = fecha.setMinutes(fecha.getMinutes());
    // console.log(fecha)
    // setFinalHora(fecha );
    // console.log(fecha.getMinutes() * 60)

    // console.log(new Date(fecha2).getMinutes())
    const cargarSubastas = async() =>{
      const resultado = await  obtenerSubastasActivas();
      let fecha = new Date(resultado[0].FECHA_ACTIVACION || "");
      setReferenciaCompra(resultado[0].REFERENCIA_COMPRA)
      console.log(resultado[0].REFERENCIA_COMPRA)
      setFinalHora(fecha)
      setSubastas(resultado);
    }
    cargarSubastas();
  
  }, [])
  console.log('1')

 
  const handleClick = (e) =>{
    const {NOMBRE_PRODUCTO, ID} = e;
    console.log(NOMBRE_PRODUCTO)
    const existe  = productos.some(({NOMBRE})=>(NOMBRE === NOMBRE_PRODUCTO));
    if(!existe){
      setAlerta({msg: 'no tienes este prodcuto', id: ID});
      return
    }
    console.log('si tienes')
    socket && socket.emit('postular', productos)
  }
  console.log(minutos)
  return (
    <div className='mx-auto container text-center pt-10 '>
        <h1 className='text-3xl font-semibold'>Subasta Disponibles</h1>
        

        <div className='flex justify-center mt-12 gap-2'>
          <div className='border border-1 border-red-600 flex-1 '>
            {
              subastas.length > 0 ?  
                    subastas.map((subasta)=>(
                        <CardSubasta key={subasta.ID} subasta={subasta} minutos={minutos} alerta={alerta} resultado={resultado} handleClick={handleClick} hora={hora}/>
                      

                  ))
                : 'no hay subastas disponibles'
            }
              
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


// {alerta  && (<p className='bg-red-500'>{alerta}</p>) }
// <p>Productos Necesarios  :  {NOMBRE_PRODUCTO}</p>
// {/* disabled={minutos === null ? true : false} */}
// <button  onClick={(e) => handleClick({REFERENCIA_COMPRA, FECHA_ACTIVACION, NOMBRE_PRODUCTO},e)} className='bg-green-500 px-4 py-2 text-white'>POSTULAR</button>
// <p>{minutos === null  ? "" :  hora}</p>
// <p>{minutos === null ? "Subasta Finalizada" : minutos.toFixed(0)+" minutos para finalizar"} </p>
// <p className='bg-gray-400 px-2 '>Tus productos Seleccionados</p>
// <div className='flex '>
//   {resultado.length > 0 && (

//   resultado.map((producto)=>(
//     <div className='text-center  mb-4 '>
//       <p>Nombre: {producto.NOMBRE}</p>
//       <p>Precio_exp: {producto.PRECIO_EXP}</p>
//       <hr  className=''/>
//     </div>
//    ))
//   )}
// </div>