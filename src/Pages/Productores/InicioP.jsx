import React, { useEffect, useState } from 'react'
import ModalProducto from '../../Components/productores/ModalProducto';
import Productos from '../../Components/productores/Productos'
import { obtenerProductos } from '../../Helpers/getProductores';
import useAuth from '../../Hooks/useAuth';


const InicioP = () => {

  const [activeModal, setActiveModal] = useState(false)
  const [reload, setReload] = useState(false);
  const {setAuth,productos, setProductos} = useAuth();
  useEffect(() => {
      const cargarProductos= async()=>{
         const resultado =  await obtenerProductos()
          setProductos(resultado)
      }
      console.log('1')
      cargarProductos();
  },[ activeModal, reload, setAuth, setProductos])

  const handleModal = () =>{
    setActiveModal(!activeModal)
  }
  return (
    <div className='container mx-auto '>
      <div className='pt-4 flex  justify-between'>
        <p className='text-center font-bold text-3xl '>Mis Productos</p>
        <button onClick={handleModal} className='bg-blue-500 text-white text-xl py-2 px-4 rounded-lg font-semibold'>+ Agregar Producto</button>
      </div>
    {activeModal &&
    
      <ModalProducto handleModal={handleModal} setActiveModal={setActiveModal}/>
    }

    <div className='flex justify-center gap-12 mt-12 flex-wrap'>
      
      {
        productos.length > 0 ? productos.map((producto, i)=>(
          <Productos key={i}   producto={producto} setReload={setReload} reload={reload}/>

      
        )):''
      }
    </div>
    </div>
    
  )
}

export default InicioP