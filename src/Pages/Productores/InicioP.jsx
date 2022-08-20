import React, { useEffect, useState } from 'react'
import Productos from '../../Components/productores/Productos'
import { obtenerProductos } from '../../Helpers/getProductores';


const InicioP = () => {
  const [productos, setProductos] = useState({})
  useEffect(() => {
      const cargarProductos= async()=>{
         const resultado =  await obtenerProductos()
          setProductos(resultado)
      }

      cargarProductos();
  },[ ])
  return (
    <div className=''>
      <p className='text-center font-bold text-2xl '>Mis Productos</p>
    <div className='flex justify-center gap-12 mt-12 flex-wrap'>
      {
        productos.length > 0 ? productos.map((producto, i)=>(
          <Productos key={i}   producto={producto}/>

      
        )):''
      }
    </div>
    </div>
    
  )
}

export default InicioP