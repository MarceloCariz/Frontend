import React from "react";
import {Outlet, Link} from 'react-router-dom'
const AuthLayout = () => {
  return (
    <>
  <main className=" h-screen  fondo ">
      <nav className="h-14 bg-black/50 px-12  flex justify-end  items-center">
        <ul className="text-rigth flex gap-2">
          {/* <Link to={pathname === '/productores' ? '/' : '/productores'} className={pathname === '/productores' ? "bg-blue-600 px-4 py-2 text-white font-semibold" : "bg-green-600 px-4 py-2 text-white font-semibold"} >
            { pathname ==='/productores' ? "Acceso Clientes": "Acceso Productores" 
              
            }</Link> */}
               <Link to={'/transportistas'} className={" px-4 py-2 text-white font-semibold bg-gray-700 "} >
            Acceso Transportistas</Link>
            <Link to={'/productores'} className={" px-4 py-2 text-white font-semibold bg-green-600 "} >
            Acceso Productores</Link>
            <Link to={'/'} className={" px-4 py-2 text-white font-semibold bg-blue-600 "} >
            Acceso Clientes</Link>
         
        </ul>
      </nav>
      <div className="md:w-2/3 lg:w-2/5 container mx-auto pt-20 md:pt-32 p-5 flex justify-center  ">
          <Outlet/>
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
