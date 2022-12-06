import React, {  useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser,  faRightFromBracket, faTruck, faBars, faSeedling, faGavel } from '@fortawesome/free-solid-svg-icons'
import useConsultas from '../Hooks/useConsultas';





const TransportistaLayout = ({children}) => {
    const {auth, setAuth, setConfig} = useAuth();
    const {setEnviosT, setEnviosCompletadosT, setContratoT} = useConsultas();

    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState(false)


    const handleLogout = () =>{

        setEnviosCompletadosT([]);
        setContratoT({});
        setEnviosT([]);
        setAuth({});
        setConfig({});
        localStorage.clear();
        navigate('/transportistas')
    }

    

    const handleMenu = () =>{
        setActiveMenu(!activeMenu)
    }
return (
        <div className='#d4d8dd'>
            <nav className=' bg-stone-800'>
            <div className='sm:h-32 h-24 flex sm:justify-between items-center  container md:px-2 2xl:px-0 mx-auto text-white'>
                <Link to="/transportista"><h1 className='lg:text-4xl md:text-3xl text-2xl text-white font-semibold flex items-center gap-1 ml-2 '>
                    <FontAwesomeIcon icon={faSeedling}/>
                    MaipoGrande</h1></Link>
                {/* Desktop */}
                <div className='sm:flex hidden items-center justify-end  w-2/3 lg:gap-8 gap-4'>
                    <NavLink to={'envios'} className={({isActive})=> isActive ? 'flex cursor-pointer hover:text-gray-50 underline decoration-2 underline-offset-8' : 'flex cursor-pointer hover:text-gray-50'}>
                        <FontAwesomeIcon icon={faTruck} className="lg:text-2xl mr-2 mt-1"/>
                        <p className='lg:text-2xl md:text-lg '>Mis Envios</p>
                    </NavLink>
                    <NavLink to={'subastas'} className={({isActive})=> isActive ? 'flex cursor-pointer hover:text-gray-50 underline decoration-2 underline-offset-8' : 'flex cursor-pointer hover:text-gray-50'}>
                        <FontAwesomeIcon icon={faGavel} className="lg:text-2xl mr-2 mt-1"/>
                        <p className='lg:text-2xl md:text-lg '>Subastas</p>
                    </NavLink>
                    
                    <NavLink to={'perfil'} className={({isActive})=> isActive ? 'flex cursor-pointer hover:text-gray-50 underline decoration-2 underline-offset-8' : 'flex cursor-pointer hover:text-gray-50'} >

                        <FontAwesomeIcon icon={faUser} className="lg:text-2xl mr-2 mt-1"/>

                        <p className='lg:text-2xl md:text-lg  capitalize'> {auth.NOMBRE}</p>
                    </NavLink>
        
        
                    {/* <input type="text" onClick={handleLogout} value="Cerrar Sesion" /> */}
                    <button className='md:ml-2 lg:ml-4 bg-red-500 text-white px-4 py-2  mt-24 sm:mt-0 rounded-lg'  onClick={handleLogout} >
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 "/>
                        <span className='font-bold lg:inline-block md:hidden '>Cerrar Sesión</span>
                        </button>
                </div>
    

            
                {/* Responsive */}
                <div className='sm:hidden flex justify-between items-center gap-2 w-1/5  ml-16'>
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
                <div  className=' right-0  text-white text-center  absolute animate__animated animate__fadeIn animate__faster'>
                    <nav className='bg-stone-800 h-40 w-auto px-4 py-4 flex flex-col justify-between'>
                    <Link to={"/transportista/envios"} className='flex cursor-pointer'>
                        <FontAwesomeIcon icon={faTruck} className="text-xl mr-2 mt-1"/>
                        <p className='text-xl  '>Mis Envios</p>
                    </Link>
                    <Link to={'/transportista/subastas'} className='flex cursor-pointer'>
                        <FontAwesomeIcon icon={faGavel} className="text-xl mr-2 mt-1"/>
                        <p  className='text-xl  '>Subastas</p>
                    </Link>
                    <NavLink to={'perfil'} className='flex cursor-pointer' >
                    <FontAwesomeIcon icon={faUser} className="text-xl mr-2 mt-1"/>

                        <p className='sm:text-2xl text-xl capitalize'> {auth.NOMBRE}</p>
                    </NavLink>
        
                    </nav>
                </div>
            }

                {/* fin responsive */}

            {/* CONTENIDO */}
            <div className='min-h-screen mx-auto  sm:mt-0  bg-gray-100 '>
                <div className='container mx-auto'>
                    {children}
                </div>
            </div>
            {/* CONTENIDO FIN */}
            <footer className=' bottom-0 text-center  items-center flex justify-center w-full    h-32 bg-stone-800'>
                <div className="flex flex-col gap-2">
                <Link to="/inicio"><h1 className='sm:text-4xl text-2xl text-white font-semibold flex items-center gap-1 '>
                    <FontAwesomeIcon icon={faSeedling }/>
                        MaipoGrande</h1>
                </Link>
                <p className="text-white text-sm">
                © TODOS LOS DERECHOS RESERVADOS
                </p>
            </div>

            </footer>
        </div>
  )
}

export default TransportistaLayout