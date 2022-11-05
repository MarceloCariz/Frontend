import {
  faBagShopping,
  faBars,
  faCartShopping,
  faRightFromBracket,
  faUser,
  faSeedling,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {  Link, NavLink, useNavigate } from "react-router-dom";
import { Buscador } from "../Components/clients/layout/Buscador";
import { CarritoHover } from "../Components/ui/CarritoHover";
import useAuth from "../Hooks/useAuth";
import useConsultas from "../Hooks/useConsultas";


const ClienteLayout = ({ children }) => {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [activeMenu, setActiveMenu] = useState(false);
  const [hoverCarrito, setHoverCarrito] = useState(false);
  const { auth, carrito, setCarrito } = useAuth();
  const {setPedidos, setProductos} = useConsultas();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (auth.ID_ROL === 5) {
      const cantidad = carrito.reduce((sum, i) => sum + i.unidad, 0);
      setCantidadCarrito(cantidad);
    }
  }, [carrito, auth]);

  const handleMenu = () => {
    setActiveMenu(!activeMenu);
  };
  const handleLogout = () => {
    localStorage.clear();
    setCarrito([]);
    setPedidos([]);
    setProductos([]);
    navigate("/");
  };

  const handleHoverCarrito = () =>{
    console.log(carrito)
    setHoverCarrito(true);
  }

  const leaveCarrito = () =>{
    setHoverCarrito(false);
    console.log(false)
  }
  return (
    <div className="#d4d8dd">
      <nav className=" bg-stone-800">
        <div className="sm:h-32 h-24 flex sm:justify-between items-center   sm:container  mx-auto text-white">
          <Link to="/inicio">

            <h1 className="sm:text-4xl text-2xl text-white font-semibold sm:pl-0 pl-2 flex sm:gap-2 items-center ">
            <FontAwesomeIcon icon={faSeedling }/>

              MaipoGrande
            </h1>
          </Link>
          <div className="w-1/3 sm:block hidden">
            <Buscador />
          </div>
          <div className="sm:flex hidden items-center gap-4 ">
            <NavLink to="pedidos"  className={({isActive})=> isActive ? 'flex gap-1 cursor-pointer hover:text-gray-50 underline decoration-2 underline-offset-8' : 'flex gap-1 cursor-pointer hover:text-gray-50'}>
              <FontAwesomeIcon icon={faBagShopping} className="text-2xl mt-1" />
              <p className="sm:text-2xl capitalize">pedidos</p>
            </NavLink>
            <NavLink to={'perfil'} className={({isActive})=> isActive ? 'flex gap-1 cursor-pointer hover:text-gray-50 underline decoration-2 underline-offset-8' : 'flex gap-1 cursor-pointer hover:text-gray-50'}>
              <FontAwesomeIcon icon={faUser} className="text-2xl  mt-1" />
              <p className="sm:text-2xl capitalize"> {auth.NOMBRE}</p>
            </NavLink>

            <div onMouseEnter={handleHoverCarrito} onMouseLeave={leaveCarrito} className=" sm:flex gap-2 hidden  transition ease-in duration-300  hover:-translate-y-1">
              <NavLink to="carrito" className={({isActive})=> isActive ? 'flex gap-1 cursor-pointer hover:text-gray-50 underline decoration-2 underline-offset-8' : 'flex gap-1 cursor-pointer hover:text-gray-50'}>
                <FontAwesomeIcon icon={faCartShopping} className="text-3xl " />
              </NavLink>
            </div>
            <p className="mb-8">{cantidadCarrito}</p>

            {/* HOVER CARRITO */}
            {hoverCarrito &&
              <CarritoHover carrito={carrito} handleHoverCarrito={handleHoverCarrito} />
            }
            {/* <input type="text" onClick={handleLogout} value="Cerrar Sesion" /> */}
            <button
              className="sm:ml-4 bg-red-500 text-white px-4 py-2 absolute sm:relative ml-20 mt-24 sm:mt-0"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 " />
              <span className="font-bold ">Cerrar Sesion</span>
            </button>
          </div>
          {/* Responsive */}

          <div className="sm:hidden flex justify-between items-center gap-2 w-1/4 ml-12  ">
          <button
              className="  bg-red-500  text-white px-2    "
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faRightFromBracket} className=" " />
            </button>
               <div className=' flex gap-2  '>
                  <Link to="carrito "className=' flex '>
                  <FontAwesomeIcon icon={faCartShopping} className="text-2xl "/>
                  </Link>

                </div>
                <p className='mb-8'>{cantidadCarrito}</p>
      
            <FontAwesomeIcon
              onClick={handleMenu}
              icon={faBars}
              className="text-6xl font-bold "
            />
          </div>
        </div>
      </nav>
      {/* Menu responsive */}
      {activeMenu && (
        <div className="right-0  text-white text-center z-1 absolute animate__animated animate__fadeIn animate__faster">
          <nav className="bg-stone-800 h-auto w-auto px-4 py-4 flex flex-col justify-between gap-4  " >
          <Link onClick={()=> setActiveMenu(false)} to={'/inicio'} className="flex cursor-pointer">
              <FontAwesomeIcon
                icon={faHome}
                className="text-xl mr-2 mt-1"
              />
              <p className="text-xl  ">Inicio</p>
            </Link>
            <Link  onClick={()=> setActiveMenu(false)} to={'pedidos'} className="flex cursor-pointer">
              <FontAwesomeIcon
                icon={faBagShopping}
                className="text-xl mr-2 mt-1"
              />
              <p className="text-xl  ">Mis Pedidos</p>
            </Link>

            <Link  onClick={()=> setActiveMenu(false)} to="perfil" className="flex cursor-pointer">
              <FontAwesomeIcon icon={faUser} className="text-xl mr-2 mt-1" />

              <p className="sm:text-2xl text-xl capitalize"> {auth.NOMBRE}</p>
            </Link>
          </nav>
        </div>
      )}
      {/* <div className=' flex justify-end container '>
        <div className="h-42 bg-red-500 absolute "> 
         {carrito && carrito.map((producto) =>(
            <div key={producto.ID} className="flex">
              <p>{producto.NOMBRE}</p>
              <p>{producto.CANTIDAD}</p>
            </div>
         ))}

        </div>
      
      </div> */}
      {/* fin responsive */}
      {/* CONTENIDO */}

      <div className=" min-h-screen mx-auto sm:mt-0 pt-4 bg-gray-100 mb-0 ">

        {children}
        </div>
      {/* CONTENIDO FIN */}
      <footer className='  bottom-0 sm:h-64 static  text-center  items-center flex justify-center w-full    h-32 bg-stone-800'>
            <Link to="/inicio"><h1 className='sm:text-4xl text-2xl text-white font-semibold flex items-center gap-1 '>
            <FontAwesomeIcon icon={faSeedling }/>
                
                MaipoGrande</h1></Link>

        </footer>
      {/* <footer className=" fixed bottom-0 text-center  flex justify-center w-full  sm:hidden ">
        <div className="flex  flex-row  justify-center h-16 w-2/3 border-2 ">
          <div className="bg-white border-b-0 w-full h-full pt-4 ">
            <p className="">Usuario</p>
          </div>
          <div className="bg-white border-b-0 w-full h-full pt-4">
            <p>Pedidos</p>
          </div>
          <div className="bg-white border-b-0 w-full h-full pt-4">
            <Link to="carrito " className=" flex items-center justify-center">
              <img
                className="sm:w-10 sm:h-10 w-8 h-8 "
                src={carritoIcon}
                alt=""
              />
              <p className="pl-2 ">{cantidadCarrito}</p>
            </Link>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default ClienteLayout;
