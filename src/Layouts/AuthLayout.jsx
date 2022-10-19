import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Outlet, Link } from "react-router-dom";
import fondo from './img/fondo.jpg'
const AuthLayout = () => {
  return (
    <>
      <main style={{backgroundImage:`url(${fondo})` }} className=" h-screen  ">

        <nav className="sm:h-22  py-4  bg-black/50 px-12 flex sm:justify-end  justify-center items-center">
        <h2 className="sm:flex hidden text-white justify-start gap-2  text-3xl w-full items-center  text-center  ">
            <FontAwesomeIcon
              className="font-bold animate-pulse"
              icon={faSeedling}
            />
            Maipo Grande{" "}
    
          </h2>
          <ul className="text-rigth flex gap-2 w-2/3 container sm:justify-end justify-center ">
            {/* <Link to={pathname === '/productores' ? '/' : '/productores'} className={pathname === '/productores' ? "bg-blue-600 px-4 py-2 text-white font-semibold" : "bg-green-600 px-4 py-2 text-white font-semibold"} >
            { pathname ==='/productores' ? "Acceso Clientes": "Acceso Productores" 
              
            }</Link> */}
            <Link
              to={"/consultores"}
              className={" px-4 py-2 text-white font-semibold bg-amber-500 "}
            >
              Acceso Consultor
            </Link>

            <Link
              to={"/productores"}
              className={" px-4 py-2 text-white font-semibold bg-green-600 "}
            >
              Acceso Productores
            </Link>
            <Link
              to={"/"}
              className={" px-4 py-2 text-white font-semibold bg-blue-600 "}
            >
              Acceso Clientes
            </Link>
            <Link
              to={"/transportistas"}
              className={" px-4 py-2 text-white font-semibold bg-gray-700 "}
            >
              Acceso Transportistas
            </Link>
          </ul>
        </nav>
        <div className=" sm:w-auto  container mx-auto pt-20 md:pt-32 p-5 flex justify-center  ">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
