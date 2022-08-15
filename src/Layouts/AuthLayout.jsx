import React from "react";
import {Outlet} from 'react-router-dom'
const AuthLayout = () => {
  return (
    <>
  <main className=" h-screen  fondo">
      <div className="md:w-2/3 lg:w-2/5 container mx-auto pt-20 md:pt-32 p-5 flex justify-center ">
          <Outlet/>
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
