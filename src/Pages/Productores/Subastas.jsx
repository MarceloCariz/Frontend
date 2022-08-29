import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import useAuth from '../../Hooks/useAuth';

const Subastas = () => {
  const {productos} = useAuth();
  const [hora, setHora] = useState('')
  const [finalHora, setFinalHora] = useState(0);
  const [minutos, setMinutos] = useState(1)
  const obj = [
    {
        "ID_PRODUCTO": 74,
        "NOMBRE": "pepino",
        "PRECIO_LOCAL": 10200,
        "PRECIO_EXP": 520,
        "CANTIDAD": "1200",
        "ID_PRODUCTOR": 22,
        "CALIDAD": "premium",
        "IMAGE_URL": "http://168.138.133.24:4000/img/tomate.jpg"
    },
    {
        "ID_PRODUCTO": 75,
        "NOMBRE": "pepino",
        "PRECIO_LOCAL": 800,
        "PRECIO_EXP": 540,
        "CANTIDAD": "1000",
        "ID_PRODUCTOR": 2,
        "CALIDAD": "premium",
        "IMAGE_URL": "http://168.138.133.24:4000/img/pepino.jpg"
    },
    {
        "ID_PRODUCTO": 77,
        "NOMBRE": "Zapallo",
        "PRECIO_LOCAL": 10200,
        "PRECIO_EXP": 5200,
        "CANTIDAD": "1200",
        "ID_PRODUCTOR": 2,
        "CALIDAD": "premium",
        "IMAGE_URL": "http://168.138.133.24:4000/img/zapallo.jpg"
    }
]
    const activo = false;
  
    const  socket = activo && io('http://localhost:4000');

  useEffect(() => {
    const ordenarArray = (array) =>{
      const productosUniques = obj.reduce((acc, product,i)=>{
        if(!acc[product.NOMBRE]){
          acc[product.NOMBRE] = []
        }
        acc[product.NOMBRE].push(product)
        
        return acc
  
      },[]);
      // console.log(productosUniques.pepino)
      // console.log((productosUniques.length))
      const productosElegidos = []
      for(const p in productosUniques){
     
        const minprecio = productosUniques[p].sort((a,b)=>(
          a.PRECIO_EXP - b.PRECIO_EXP
        ))
        productosElegidos.push(minprecio[0])
      }
      // for(let i = 0; i < productosUniques.length; i++){
      //   console.log(i) 
      // }
      // console.log(productosUniques)
      console.log(productosElegidos)
  
  
    }
    ordenarArray(obj)
    let fecha = new Date("2022-08-28T23:21:00.00");
    // desde la orden de compra recibo la fecha con los minutos
    const fecha2 = fecha.setMinutes(fecha.getMinutes());
    console.log()
    setFinalHora(fecha );
    // console.log(fecha.getMinutes() * 60)

    // console.log(new Date(fecha2).getMinutes())
  
  }, [])

  useEffect(() => {
    const cargarHora = ()=>{
      const horaActual = new Date();
      setMinutos((finalHora  - horaActual)/(1000*60) )
      setHora(horaActual.toLocaleTimeString())
    }
      setTimeout(()=>{
        if(minutos === 0){
            socket.emit('postular',{} ,true)
            return
        }
        cargarHora();
      },2000)


  }, [hora])
 
  const handleClick = () =>{
    console.log(productos)

    socket && socket.emit('postular', productos)
  }
  return (
    <div className='mx-auto container text-center pt-10 '>
        <h1 className='text-3xl font-semibold'>Subasta Disponibles</h1>
        

        <div className='flex justify-center mt-12 gap-2'>
          <div className='border border-1 border-red-600 flex-1 '>
              <p>Prodcutos Necesarios</p>
              <button  disabled={minutos === 0 ? true : false} onClick={handleClick} className='bg-green-500 px-4 py-2 text-white'>POSTULAR</button>
              <p>{minutos <= 0 ? "" :  hora}</p>
              <p>{minutos <= 0 ? "Subasta Finalizada" : minutos.toFixed(0)+" minutos para finalizar"} </p>
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