import React, {  useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser,  faRightFromBracket, faTruck, faBars, faSeedling, faGavel } from '@fortawesome/free-solid-svg-icons'
const ConsultorLayout = ({children}) => {
    const {auth, setAuth} = useAuth();
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState(false)

    // useEffect(() => {
    //     const cargarProductos= async()=>{
    //         const resultado =  await obtenerProductos()
    //          setProductos(resultado)
    //      }
    //      cargarProductos();
    //      console.log('1')
    // }, [setProductos, auth])



    const handleLogout = () =>{

        setAuth({});
        
        localStorage.clear();
        navigate('/consultores')
      }

      

      const handleMenu = () =>{
        setActiveMenu(!activeMenu)
      }
  return (
    <div className='#d4d8dd'>
        <nav className=' bg-stone-800'>
          <div className='sm:h-32 h-24 flex sm:justify-between items-center  container mx-auto text-white'>
            <Link to="/consultor"><h1 className='sm:text-4xl text-2xl text-white font-semibold flex items-center gap-1 ml-2 '>
                <FontAwesomeIcon icon={faSeedling}/>
                MaipoGrande</h1></Link>
            {/* Desktop */}
            <div className='sm:flex hidden items-center justify-end  w-2/3 gap-8 '>
                <NavLink to={'reportes'}  className={({isActive})=> isActive ? 'flex cursor-pointer hover:text-gray-50 underline decoration-2 underline-offset-8' : 'flex cursor-pointer hover:text-gray-50'}>
                    <FontAwesomeIcon icon={faTruck} className="text-2xl mr-2 mt-1"/>
                    <p className='text-2xl  '>Reportes</p>
                </NavLink>

                
                <NavLink to={''} className='flex cursor-pointer' >

                    <FontAwesomeIcon icon={faUser} className="text-2xl mr-2 mt-1"/>

                    <p className='sm:text-2xl capitalize'> {auth.NOMBRE}</p>
                </NavLink>
      
    
                {/* <input type="text" onClick={handleLogout} value="Cerrar Sesion" /> */}
                <button className='sm:ml-4 bg-red-500 text-white px-4 py-2 absolute sm:relative ml-20 mt-24 sm:mt-0'  onClick={handleLogout} >
                <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 "/>
                    <span className='font-bold '>Cerrar Sesion</span>
                    </button>
            </div>
   

        
            {/* Responsive */}
            <div className='sm:hidden flex justify-between items-center gap-2 w-1/5  ml-20'>
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
                    <FontAwesomeIcon icon={faGavel} className="text-xl mr-2 mt-1"/>
                    <Link to={'/reportes'} className='text-xl  '>Reportes</Link>
                </div>
                <NavLink to={'perfil'} className='flex cursor-pointer' >
                <FontAwesomeIcon icon={faUser} className="text-xl mr-2 mt-1"/>

                    <p className='sm:text-2xl text-xl capitalize'> {auth.NOMBRE}</p>
                </NavLink>
      
                </nav>
            </div>
        }

            {/* fin responsive */}

        {/* CONTENIDO */}
        <div className='min-h-screen mx-auto  sm:mt-0 pt-4 bg-gray-100 '>
            <div className='container mx-auto'>
                {children}
            </div>
        </div>
        {/* CONTENIDO FIN */}
        <footer className=' bottom-0 text-center  items-center flex justify-center w-full    h-32 bg-stone-800'>
            <Link to="/inicio"><h1 className='sm:text-4xl text-2xl text-white font-semibold flex items-center gap-1 '>
            <FontAwesomeIcon icon={faSeedling}/>
                
                MaipoGrande</h1></Link>

        </footer>
    </div>
  )
}

export default ConsultorLayout