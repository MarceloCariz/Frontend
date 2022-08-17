import React from "react";
import {Outlet, Link} from 'react-router-dom'
const AuthLayout = () => {
  return (
    <>
  <main className=" h-screen  fondo ">
      <nav className="h-14 bg-black/50 px-12  flex justify-end  items-center">
        <ul className="text-rigth">
          <Link to="productores" className="bg-green-600 px-4 py-2 text-white font-semibold">Acceso Productores</Link>
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
