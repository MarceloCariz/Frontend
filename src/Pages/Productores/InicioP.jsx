import {  faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import ModalProducto from '../../Components/productores/ModalProducto';
import Productos from '../../Components/productores/Productos'
import { Spinnner } from '../../Components/ui/Spinnner';
import useConsultas from '../../Hooks/useConsultas';


const InicioP = () => {
  const [activeModal, setActiveModal] = useState(false)
  const [reload, setReload] = useState(false);
  // const [cargando, setCargando] = useState(false)
  const {  cargarProductosProductor , productosP, cargando} = useConsultas();
// console.log(auth)
  
  useEffect(() => {

      
    cargarProductosProductor();

  },[ ])
  const handleModal = () =>{
    setActiveModal(!activeModal)
  }
  return (
    <div className='container mx-auto '>
      <div className='pt-4 flex md:mx-12   sm:flex-row sm:justify-between flex-col items-center gap-2 sm:gap-0 justify-center'>
        <p className='text-center font-bold sm:text-3xl md:text-2xl  text-xl'>Mis Productos</p>
        <button onClick={handleModal} className='hover:-translate-y-2  hover:bg-blue-600  bg-blue-500  sm:h-auto h-12 flex items-center gap-1 text-white sm:text-xl py-2 px-4 rounded-lg font-semibold'>
          <FontAwesomeIcon className='sm:mt-1 sm:text-2xl text-2xl ' icon={faCirclePlus}/>
          Agregar Producto</button>
      </div>

    {activeModal &&
    
      <ModalProducto handleModal={handleModal} setActiveModal={setActiveModal}/>
    }

    <div className='flex justify-center    mt-12 '>
      {cargando && <Spinnner color={'black'} />}

      <div className='flex gap-0 md:gap-10 md:mx-2 justify-center flex-wrap lg:gap-6 '>
      {
        productosP.length > 0 && !cargando  ? productosP.map((producto, i)=>(
            <Productos key={i}   producto={producto} setReload={setReload} reload={reload}/>      
        )):cargando ? '' : 'No tienes productos'
      }
    </div>
    </div>
    </div>
    
  )
}

export default InicioP