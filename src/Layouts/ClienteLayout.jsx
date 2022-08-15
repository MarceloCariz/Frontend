import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import useAuth from '../Hooks/useAuth';
import carritoIcon  from './icons/carrito.png'
const ClienteLayout = ({children}) => {

  const {pathname}= useLocation();
  const location = (pathname.replace('/',''));

  const {auth, carrito} = useAuth();
  return (
    <div>
        <nav className=' bg-stone-800'>
          <div className='h-32 flex justify-between items-center  container mx-auto text-white'>
            <h1 className='text-4xl text-white font-semibold'>MaipoGrande</h1>
            <p className='text-3xl capitalize'>{location}</p>
            <div className='flex items-center'>
               <p><span className='text-3xl '>&#9786;</span></p>
                <p className='text-2xl capitalize'> {auth.NOMBRE}</p>
                <div className='ml-4 flex '>
                  <Link to="carrito "className='ml-4 flex '>
                  <img className='w-10 h-10  ' src={carritoIcon} alt="" />
                  <p className='pl-2 '>{carrito.length > 0 ? carrito.length : '0'}</p>
                  </Link>
                </div>
            </div>
          </div>
        </nav>
        {/* CONTENIDO */}
        <div className='container mx-auto'>

        {children}




        </div>
        {/* CONTENIDO FIN */}
        <footer className='min-h-screen'>

        </footer>
    </div>
  )
}

export default ClienteLayout