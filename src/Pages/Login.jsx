
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardBienvenido from "../Components/login/ui/CardBienvenido";
import { TituloLogin } from "../Components/login/ui/TituloLogin";
import { login } from "../Helpers/getClientes";
import useAuth from "../Hooks/useAuth";

const Login = () => {
  const [formValues, setFormValues] = useState({ correo: "", password: "" });
  const [alerta, setAlerta] = useState('')
  const { setAuth } = useAuth();
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
      
      navigate('/inicio')
        
      


    } catch (error) {
      setAlerta(error.response.data.msg);
    }

  };
  return (
    <div  className="text-xl flex sm:flex-row  justify-center sm:w-auto  r   mt-4 ">
      <CardBienvenido/>
    <div className="    shadow-lg sm:rounded-r-lg  sm:rounded-none  rounded-lg bg-white   flex justify-center items-center ">

      <form onSubmit={handleSubmit} className="flex justify-center items-center sm:w-96   gap-8 flex-col px-4 py-6  ">
      <TituloLogin acceso={'clientes'}/>
        
      {
      alerta && (
        <p className="text-sm font-bold relative bg-red-500 text-white px-2">{alerta}</p>
      )
    }
        <div className="">
          <input
            className="h-12 border px-2 rounded-md lowercase"
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
        <input className=" cursor-pointer hover:bg-blue-600 text-center rounded-lg bg-blue-500 text-white px-8 py-4" type="submit" value="Iniciar Sesión" />
        </div>
        <Link className="text-lg text-blue-500" to="registrar">¿No tienes cuenta? Registrate Aqui.</Link>
      </form>
    </div>

    </div>
  );
};

export default Login;
