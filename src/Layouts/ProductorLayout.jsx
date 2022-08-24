import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faUser,  faRightFromBracket, faTruck, faBars } from '@fortawesome/free-solid-svg-icons'
const ProductorLayout = ({children}) => {
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState(false)

    const handleLogout = () =>{
        localStorage.clear();
        navigate('/')
      }


      const handleMenu = () =>{
        setActiveMenu(!activeMenu)
      }
  return (
    <div className='#d4d8dd'>
        <nav className=' bg-stone-800'>
          <div className='sm:h-32 h-24 flex sm:justify-between items-center  container mx-auto text-white'>
            <Link to="/inicio"><h1 className='sm:text-4xl text-2xl text-white font-semibold '>MaipoGrande</h1></Link>
            {/* Desktop */}
            <div className='sm:flex hidden items-center justify-end  w-1/2 gap-8 '>
                <div className='flex cursor-pointer'>
                    <FontAwesomeIcon icon={faTruck} className="text-2xl mr-2 mt-1"/>
                    <p className='text-2xl  '>Mis Envios</p>
                </div>
                <div className='flex cursor-pointer'>
                    <FontAwesomeIcon icon={faShop} className="text-2xl mr-2 mt-1"/>
                    <p className='text-2xl  '>Mis Productos</p>
                </div>
                <div className='flex cursor-pointer' >
                <FontAwesomeIcon icon={faUser} className="text-2xl mr-2 mt-1"/>

                    <p className='sm:text-2xl capitalize'> {auth.NOMBRE}</p>
                </div>
      
    
                {/* <input type="text" onClick={handleLogout} value="Cerrar Sesion" /> */}
                <button className='sm:ml-4 bg-red-500 text-white px-4 py-2 absolute sm:relative ml-20 mt-24 sm:mt-0'  onClick={handleLogout} >
                <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 "/>
                    <span className='font-bold '>Cerrar Sesion</span>
                    </button>
            </div>
   

        
            {/* Responsive */}
            <div className='sm:hidden flex justify-between items-center gap-2 w-1/5  ml-28'>
            <button className='  bg-red-500  text-white px-2 ml-4    '  onClick={handleLogout} >
                    <FontAwesomeIcon icon={faRightFromBracket} className=" "/>
            </button>
                <FontAwesomeIcon onClick={handleMenu} icon={faBars} className="text-6xl font-bold"/>
        
            </div>
          

            {/* fin responsive */}
          </div>
        </nav>
 
        {/* Menu responsive */}
        {
            activeMenu &&
            <div className=' flex justify-end  text-white text-center'>
                <nav className='bg-stone-800 h-40 w-auto px-4 py-4 flex flex-col justify-between'>
                <div className='flex cursor-pointer'>
                    <FontAwesomeIcon icon={faTruck} className="text-xl mr-2 mt-1"/>
                    <p className='text-xl  '>Mis Envios</p>
                </div>
                <div className='flex cursor-pointer'>
                    <FontAwesomeIcon icon={faShop} className="text-xl mr-2 mt-1"/>
                    <Link to={'/inicio-productor'} className='text-xl  '>Mis Productos</Link>
                </div>
                <div className='flex cursor-pointer' >
                <FontAwesomeIcon icon={faUser} className="text-xl mr-2 mt-1"/>

                    <p className='sm:text-2xl text-xl capitalize'> {auth.NOMBRE}</p>
                </div>
      
                </nav>
            </div>
        }

            {/* fin responsive */}

        {/* CONTENIDO */}
        <div className='min-h-screen mx-auto sm:mt-0 mt-4 bg-gray-100 '>
            {children}
        </div>
        {/* CONTENIDO FIN */}
        <footer className=' fixed bottom-0 text-center  items-center flex justify-center w-full  sm:hidden  h-32 bg-stone-800'>
            <Link to="/inicio"><h1 className='sm:text-4xl text-2xl text-white font-semibold '>MaipoGrande</h1></Link>

        </footer>
    </div>
  )
}

export default ProductorLayout