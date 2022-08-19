import React, { useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import useAuth from '../Hooks/useAuth';
import carritoIcon  from './icons/carrito.png'
const ClienteLayout = ({children}) => {
  const [cantidadCarrito, setCantidadCarrito] = useState(0)
  const {pathname}= useLocation();
  const navigate = useNavigate();
  const location = (pathname.replace('/',''));
  const {auth, carrito, setCarrito, } = useAuth();
  useEffect(() => {
    if(auth.ID_ROL === 2 ){
      const cantidad = carrito.reduce((sum, i)=>(sum + i.unidad ), 0);
      setCantidadCarrito(cantidad)
    }
 

  }, [carrito, auth])
  const handleLogout = () =>{
    localStorage.clear();
    setCarrito([])

    navigate('/')
  }
  return (
    <div className='#d4d8dd'>
        <nav className=' bg-stone-800'>
          <div className='sm:h-32 h-12 flex sm:justify-between items-center  container mx-auto text-white'>
            <Link to="/inicio"><h1 className='sm:text-4xl text-2xl text-white font-semibold '>MaipoGrande</h1></Link>
            
            <p className='sm:text-3xl capitalize sm:block hidden'>{location}</p>
            <div className='flex items-center'>
               <p><span className='text-3xl '>&#9786;</span></p>
                <p className='sm:text-2xl capitalize'> {auth.NOMBRE}</p>
                <div className='sm:ml-4  sm:flex hidden '>
                  <Link to="carrito "className='sm:ml-4 flex '>
                  <img className='sm:w-10 sm:h-10 w-8 h-8 ' src={carritoIcon} alt="" />
                  <p className='pl-2 '>{cantidadCarrito}</p>
                  </Link>
                </div>
                {/* <input type="text" onClick={handleLogout} value="Cerrar Sesion" /> */}
                <button className='sm:ml-4 bg-red-500 text-white px-4 py-2 absolute sm:relative ml-20 mt-24 sm:mt-0'  onClick={handleLogout} >Cerrar Sesion</button>
            </div>
          </div>
        </nav>
        {/* CONTENIDO */}
        <div className='container mx-auto sm:mt-0 mt-12 '>
        
        {children}




        </div>
        {/* CONTENIDO FIN */}
        <footer className=' fixed bottom-0 text-center  flex justify-center w-full  sm:hidden '>
          <div className='flex  flex-row  justify-center h-16 w-2/3 border-2 '>
          <div className='bg-white border-b-0 w-full h-full pt-4 '>
                  <p className=''>Usuario</p>
            </div>
            <div className='bg-white border-b-0 w-full h-full pt-4'>
                  <p>Pedidos</p>
            </div>
            <div className='bg-white border-b-0 w-full h-full pt-4'>
            <Link to="carrito "className=' flex items-center justify-center'>
                  <img className='sm:w-10 sm:h-10 w-8 h-8 ' src={carritoIcon} alt="" />
                  <p className='pl-2 '>{cantidadCarrito}</p>
                  </Link>
            </div>
          </div>
       
        </footer>
    </div>
  )
}

export default ClienteLayout