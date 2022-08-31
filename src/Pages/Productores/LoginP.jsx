import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { login } from '../../Helpers/getProductores';
import useAuth from '../../Hooks/useAuth';

const LoginP = () => {
  const [formValues, setFormValues] = useState({ correo: "", password: "" });
  const [alerta, setAlerta] = useState('')
  const { setAuth, auth, productos } = useAuth();
  const navigate = useNavigate();
  const handleOnchange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
    if (formValues.correo.length > 8){
        setAlerta('')
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([formValues.correo, formValues.password].includes("")) {
      setAlerta("Todos los campos son obligatorios");
      return;
    }

    try {
      const respuesta = await login(formValues);
      console.log(respuesta)
      localStorage.setItem("token", respuesta.token);

      setAuth(respuesta);
      
      navigate('/productor')
        
      


    } catch (error) {
      setAlerta(error.response.data.msg);
    }

  };

  return (
    <div className="text-xl">
    <h1 className="flex justify-center items-center  bg-green-600 text-center text-white h-14">Inicia Sesion</h1>
 
    <div className="border border-1 shadow-lg bg-white border-gray-300 rounded-lg flex justify-center items-center mt-4">

      <form  onSubmit={handleSubmit} className="flex justify-center items-center   gap-8 flex-col px-8 py-6 ">
      {
      alerta && (
        <p className="text-sm font-bold relative bg-red-500 text-white px-2">{alerta}</p>
      )
    }
        <div className="">
          <input
            className="h-12 border px-2 rounded-md"
            name="correo"
            type="text"
            placeholder="correo"
            value={formValues.correo}
            onChange={handleOnchange}
          />
        </div>
        <div>
          <input
          className="h-12 border px-2 rounded-md" 
            name="password"
            type="password"
            placeholder="contraseña"
            value={formValues.password}
            onChange={handleOnchange}
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

export default LoginP