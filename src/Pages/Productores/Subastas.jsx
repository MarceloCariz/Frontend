import React, { useEffect, useMemo } from 'react'
import io from 'socket.io-client'
import useAuth from '../../Hooks/useAuth';

const Subastas = () => {
  const {productos} = useAuth();
  
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
  const  socket = io('http://localhost:4000');


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
  
  }, [obj])


  const handleClick = (e) =>{
    console.log(e)
    socket.emit('postular', e)
  }
  return (
    <div className='mx-auto container text-center'>
        <h1>Subasta</h1>
        <p>Mis productos</p>
        {
            productos.length > 0 ? productos.map((producto)=>(
                <div key={producto.ID_PRODUCTO}>
                    <button onClick={(e)=>handleClick(producto,e)}>Enviar</button>
                </div>
            )):'no'
        }
    </div>
  )
}

export default Subastas