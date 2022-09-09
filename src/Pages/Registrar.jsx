import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { registrar } from '../Helpers/getClientes';

const Registrar = () => {
  const [formValues, setFormValues] = useState({ correo: "", password: "", password2:"", nombre: "" });
  const [alerta, setAlerta] = useState('')
  const navigate = useNavigate();
  const handleOnchange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
    console.log(formValues)
    if (formValues.correo.length > 8){
        setAlerta('')
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([formValues.correo, formValues.password, formValues.password2, formValues.nombre].includes("")) {
      setAlerta("Todos los campos son obligatorios");
      return;
    }
    console.log(formValues)
    if(formValues.password !== formValues.password2){
      setAlerta("Las contraseñas deben ser iguales")
      return
    }

    try {
      const datos ={
        correo: formValues.correo,
        password: formValues.password,
        nombre: formValues.nombre

      }
      await registrar(datos);

 
      
      navigate('/')
        
      


    } catch (error) {
      setAlerta(error.response.data.msg);
    }

  };
  return (
    <div className="text-xl">
    <h1 className="flex justify-center items-center  bg-blue-800 text-center text-white h-14">Registro Clientes</h1>
 
    <div className="border border-1 shadow-lg bg-white border-gray-300 rounded-lg flex justify-center items-center mt-4">

      <form onSubmit={handleSubmit} className="flex justify-center items-center   gap-8 flex-col px-8 py-6 ">
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
            value={formValues.correo}
            onChange={handleOnchange}
          />
        </div>
        <div className="">
          <input
            className="h-12 border px-2 rounded-md"
            name="nombre"
            type="text"
            placeholder="nombre"
            value={formValues.nombre}
            onChange={handleOnchange}
          />
        </div>
        <div>
          <input
          className="h-12 border px-2 rounded-md" 
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formValues.password}
            onChange={handleOnchange}
          />
        </div>
        <div>
          <input
          className="h-12 border px-2 rounded-md" 
            name="password2"
            type="password"
            placeholder="Repetir Contraseña"
            value={formValues.password2}
            onChange={handleOnchange}
          />
        </div>
        <div className="">
        <input className=" text-center rounded-lg bg-blue-500 text-white px-8 py-4" type="submit" value="Ingresar" />
        </div>
      </form>
    </div>
    </div>
  )
}

export default Registrar