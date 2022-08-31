import React, { useEffect, useState } from 'react'
import Productos from '../Components/clients/Productos'
import { obtenerProductos } from '../Helpers/getProducts'

const Inicio = () => {

  const [productos, setProductos] = useState({})
  useEffect(()=>{
      const cargarProductos = async() =>{
        const resultado = await obtenerProductos();
        setProductos(resultado)
      }

      cargarProductos();
  },[])
  return (
    <div className="pt-8 container mx-auto">
        <h2 className='text-left text-3xl font-semibold ml-4 sm:ml-0'>Nuestros Productos</h2>

        <Productos productos={productos}/>
    </div>
  )
}

export default Inicio