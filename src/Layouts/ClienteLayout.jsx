import {
  faBagShopping,
  faBars,
  faCartShopping,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import carritoIcon from "./icons/carrito.png";
const ClienteLayout = ({ children }) => {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [activeMenu, setActiveMenu] = useState(false);

  const navigate = useNavigate();
  const { auth, carrito, setCarrito } = useAuth();
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

    navigate("/");
  };
  return (
    <div className="#d4d8dd">
      <nav className=" bg-stone-800">
        <div className="sm:h-32 h-24 flex sm:justify-between items-center  container mx-auto text-white">
          <Link to="/inicio">
            <h1 className="sm:text-4xl text-2xl text-white font-semibold ">
              MaipoGrande
            </h1>
          </Link>

          <div className="sm:flex hidden items-center gap-4 ">
            <div className="flex gap-2">
              <FontAwesomeIcon icon={faBagShopping} className="text-2xl mt-1" />
              <p className="sm:text-2xl capitalize">pedidos</p>
            </div>
            <Link to={'perfil'} className="flex gap-1 cursor-pointer">
              <FontAwesomeIcon icon={faUser} className="text-2xl  mt-1" />
              <p className="sm:text-2xl capitalize"> {auth.NOMBRE}</p>
            </Link>

            <div className=" sm:flex gap-2 hidden ">
              <Link to="carrito " className=" flex ">
                <FontAwesomeIcon icon={faCartShopping} className="text-3xl " />
              </Link>
            </div>
            <p className="mb-8">{cantidadCarrito}</p>

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

          <div className="sm:hidden flex justify-between items-center gap-2 w-1/4 ml-24  ">
               <div className=' flex gap-2  '>
                  <Link to="carrito "className=' flex '>
                  <FontAwesomeIcon icon={faCartShopping} className="text-2xl "/>
                  </Link>

                </div>
                <p className='mb-8'>{cantidadCarrito}</p>
            <button
              className="  bg-red-500  text-white px-2    "
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faRightFromBracket} className=" " />
            </button>
            <FontAwesomeIcon
              onClick={handleMenu}
              icon={faBars}
              className="text-6xl font-bold"
            />
          </div>
        </div>
      </nav>
      {/* Menu responsive */}
      {activeMenu && (
        <div className=" flex justify-end  text-white text-center">
          <nav className="bg-stone-800 h-40 w-auto px-4 py-4 flex flex-col justify-between">
            <div className="flex cursor-pointer">
              <FontAwesomeIcon
                icon={faBagShopping}
                className="text-xl mr-2 mt-1"
              />
              <p className="text-xl  ">Mis Pedidos</p>
            </div>
            <div className="flex cursor-pointer">
              <FontAwesomeIcon icon={faUser} className="text-xl mr-2 mt-1" />
              <Link to={"/inicio-productor"} className="text-xl  ">
                ALgo
              </Link>
            </div>
            <div className="flex cursor-pointer">
              <FontAwesomeIcon icon={faUser} className="text-xl mr-2 mt-1" />

              <p className="sm:text-2xl text-xl capitalize"> {auth.NOMBRE}</p>
            </div>
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
      <div className="container mx-auto sm:mt-0 mt-12 ">{children}</div>
      {/* CONTENIDO FIN */}
      <footer className=" fixed bottom-0 text-center  flex justify-center w-full  sm:hidden ">
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
      </footer>
    </div>
  );
};

export default ClienteLayout;
