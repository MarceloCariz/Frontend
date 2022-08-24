import React, { useEffect, useState } from 'react'
import ModalProducto from '../../Components/productores/ModalProducto';
import Productos from '../../Components/productores/Productos'
import { obtenerProductos } from '../../Helpers/getProductores';
import useAuth from '../../Hooks/useAuth';


const InicioP = () => {
  const [activeModal, setActiveModal] = useState(false)
  const [reload, setReload] = useState(false);
  const {auth,productos,setProductos,  config, setAuth} = useAuth();
// console.log(auth)

  useEffect(() => {
      const cargarProductos= async()=>{
         const resultado =  await obtenerProductos(config)
          setProductos(resultado)
      }

      
      cargarProductos();
      // cargarProductos();
      // console.log(auth)
      // if(productos[0].ID_ !== auth.ID){
          // cargarProductos();

      // }
  },[ activeModal, reload, setAuth])
  
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
        productos.length > 0 && auth.ID === productos[0].ID_PRODUCTOR ? productos.map((producto, i)=>(
          <Productos key={i}   producto={producto} setReload={setReload} reload={reload}/>      
        )):'Cargando...'
      }
    </div>
    </div>
    
  )
}

export default InicioP