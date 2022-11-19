import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import fondo from './img/fondo.jpg'
const AuthLayout = () => {
   
  const {pathname} = useLocation();
  console.log(pathname)
  return (
    <>
      <main style={{backgroundImage:`url(${fondo})`,height: pathname === '/registrar' ? "140vh" : "100vh"}} className="overflow-y-hidden  bg-no-repeat bg-cover">

        <nav className="sm:h-22  py-4  bg-black/50  sm:px-4 2xl:px-12 flex flex-col sm:flex-row sm:justify-end w-full justify-center items-center">

        <h2 className="sm:flex  text-white justify-start gap-2  lg:text-3xl text-2xl sm:mb-0 mb-2 w-full items-center  text-center  ">
            <FontAwesomeIcon
              className="font-bold animate-pulse"
              icon={faSeedling}
            />
            Maipo Grande{" "}
    
          </h2>
          {/* <h3>Maipogrande</h3> */}
          <ul className="sm:text-rigth text-center text-sm sm:text-base flex gap-2 2xl:w-3/4 w-full  sm:px-0 sm:container sm:justify-end justify-center ">
            {/* <Link to={pathname === '/productores' ? '/' : '/productores'} className={pathname === '/productores' ? "bg-blue-600 px-4 py-2 text-white font-semibold" : "bg-green-600 px-4 py-2 text-white font-semibold"} >
            { pathname ==='/productores' ? "Acceso Clientes": "Acceso Productores" 
              
            }</Link> */}
            <Link
              to={"/consultores"}
              className={" sm:px-4 sm:py-2 px-1 rounded-md  text-white font-semibold bg-amber-500 "}
            >
              Acceso Consultor
            </Link>

            <Link
              to={"/productores"}
              className={" sm:px-4 sm:py-2 px-1 rounded-md text-white font-semibold bg-green-600 "}
            >
              Acceso Productores
            </Link>
            <Link
              to={"/"}
              className={" sm:px-4 sm:py-2 px-1 rounded-md text-white font-semibold bg-blue-600 "}
            >
              Acceso Clientes
            </Link>
            <Link
              to={"/transportistas"}
              className={" sm:px-4 sm:py-2 px-2 rounded-md text-white font-semibold bg-gray-700 "}
            >
              Acceso Transportistas
            </Link>
          </ul>
        </nav>
        <div className="  mx-auto  container  pt-20 md:pt-32 p-5 flex justify-center  ">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
