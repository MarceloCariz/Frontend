import React, { useState } from 'react'

const RegistrarP = () => {
  const [alerta, setAlerta] = useState('')

  return (
    <div className="text-xl">
    <h1 className="flex justify-center items-center  bg-green-600 text-center text-white h-14">Registro Productores</h1>
 
    <div className="border border-1 shadow-lg bg-white border-gray-300 rounded-lg flex justify-center items-center mt-4">

      <form  className="flex justify-center items-center   gap-8 flex-col px-8 py-6 ">
      {
      alerta && (
        <p className="text-sm font-bold relative bg-red-500 text-white px-2">{alerta}</p>
      )
    }
        <div className="">
          <input
            className="h-12 border px-2 rounded-md"
            name="correo"
            type="email"
            placeholder="correo"
            // value={formValues.correo}
            // onChange={handleOnchange}
          />
        </div>
        <div className="">
          <input
            className="h-12 border px-2 rounded-md"
            name="nombre"
            type="text"
            placeholder="nombre"
            // value={formValues.nombre}
            // onChange={handleOnchange}
          />
        </div>
        <div>
          <input
          className="h-12 border px-2 rounded-md" 
            name="password"
            type="password"
            placeholder="password"
            // value={formValues.password}
            // onChange={handleOnchange}
          />
        </div>
        <div>
          <input
          className="h-12 border px-2 rounded-md" 
            name="password2"
            type="password"
            placeholder="Repetir password"
            // value={formValues.password2}
            // onChange={handleOnchange}
          />
        </div>
        <div className="">
        <input className=" text-center rounded-lg bg-green-600 text-white px-8 py-4" type="submit" value="Ingresar" />
        </div>
      </form>
    </div>
    </div>
  )
}

export default RegistrarP