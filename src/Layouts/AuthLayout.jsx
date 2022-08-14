import React from "react";
import {Outlet} from 'react-router-dom'
const AuthLayout = () => {
  return (
    <>
  <main className=" bg-gray-100 container mx-auto mt-5 md:mt-20 p-5 flex justify-center min-h-full">
      <div className="md:w-2/3 lg:w-2/5 ">
          <Outlet/>
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
