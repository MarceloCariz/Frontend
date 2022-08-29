import {  faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      <div className='pt-4 flex sm:ml-0 ml-20  sm:flex-row sm:justify-between  gap-2 sm:gap-0 justify-center'>
        <p className='text-center font-bold sm:text-3xl text-2xl '>Mis Productos</p>
        <button onClick={handleModal} className='bg-blue-500 sm:w-auto w-32 sm:h-auto h-12 flex items-center gap-1 text-white sm:text-xl py-2 px-4 rounded-lg font-semibold'>
          <FontAwesomeIcon className='sm:mt-1 sm:text-2xl text-2xl' icon={faCirclePlus}/>
           Agregar Producto</button>
      </div>
    {activeModal &&
    
      <ModalProducto handleModal={handleModal} setActiveModal={setActiveModal}/>
    }

    <div className='flex justify-center  gap-12 mt-12 flex-wrap'>
      
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