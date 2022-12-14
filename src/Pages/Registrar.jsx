import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { registrar } from '../Helpers/getClientes';
import { validateRUT } from '../utils/validadorRut';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from '../Components/formik/MyTextInput';
import { MyRadioButton } from '../Components/formik/MyRadioButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Registrar = () => {

  const [alerta, setAlerta] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();




  const handleValidarRut = (rut) =>{
    // setFormValues({...formValues, rut: target.value})
    const valido = validateRUT(rut);
    // !valido ? setAlertaRut({valido: false, msg: 'El rut ingresado no es valido'}) : setAlertaRut({valido: true, msg: ''});
    return  valido;
  }

  const handleSubmit = async (values) => {
    const isNombreApellido = values.nombre.trim().split(' ');

    if(isNombreApellido.length <= 1){
      setAlerta('Incluya nombre y apellido')
      setTimeout(() => {
        setAlerta("");
      }, 3000);
      return
    }
    if(values.tipo === "local"){
      console.log(![values.rut].includes("-"), values.rut.split(''))
      if(!values.rut.split('').includes("-")) return setAlerta("El rut debe contener un guion (-)")
      const isValidRut = handleValidarRut(values.rut);
      if(!isValidRut && values.tipo === "local") return setAlerta("rut no valido");
    }

    try {
      const datos ={
        correo: values.correo,
        password: values.password,
        nombre: values.nombre,
        tipo : values.tipo,
        rut: values.tipo === "externo" ? "" : values.rut,

      }
      await registrar(datos);


      
      navigate('/')
        
      


    } catch (error) {
      setAlerta(error.response.data.msg);
    }

  };
  return (
    <div className='flex flex-col   md:w-3/4 lg:w-1/3  md:-mt-24 -mt-12'>
        <h1 className="flex justify-center items-center text-xl bg-blue-800 w-full text-center text-white h-14">Registro Clientes</h1>

      <div className=" border border-1 shadow-lg bg-white border-gray-300 rounded-lg flex  justify-center items-center mt-4">

      <Formik 
        initialValues={{
          correo: '', password: '', password2:'', nombre: '', tipo: '', rut: '' 
        }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={
          Yup.object({
            nombre : Yup.string().min(5, "Nombre demasiado corto").matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g ,'El nombre solo debe contener letras.').max(25, 'Nombre demasiado largo')
                    .required("Este campo es necesario"),
            correo: Yup.string().email("El correo no  es valido").required("Este campo es necesario"),
            password: Yup.string().min(6,"La contrase??a debe ser de 6 caracteres o mas").required("Este campo es necesario"),
            password2: Yup.string().oneOf([Yup.ref('password'), null], 'Las contrase??as deben coincidir').required("Este campo es necesario"),
            tipo: Yup.string().required("Este campo es necesario"),
            rut: Yup.string().when("tipo", {
              is: "local",
              then: Yup.string().max(10).required("Debe ingresar el rut")
            })
          })
        }
      >
            {
              ({handleReset, values})=>(
                <Form className="flex justify-center items-center   gap-8 flex-col px-8 py-6 ">
                  {
                    alerta && (
                    <p className="text-sm sm:text-xl font-bold relative bg-red-500 text-white px-2">{alerta}</p>
                  )}
                  <div className='flex flex-col gap-4 w-full'>
                    <MyTextInput label={"Nombre"} name="nombre"  placeholder="Nombre"/>
                    <MyTextInput label={"Correo"} name="correo"  placeholder="Correo"/>
                    <div className='flex flex-col '>
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEye} onClick={() => setShowPassword(!showPassword)} className="absolute ml-60  md:ml-80  lg:ml-72 2xl:ml-80 mt-10 cursor-pointer text-2xl"/>
                      ) :
                        <FontAwesomeIcon icon={faEyeSlash} onClick={() => setShowPassword(!showPassword)} className="absolute  text-gray-500 ml-60  md:ml-80 lg:ml-72  2xl:ml-80 mt-10 cursor-pointer text-2xl"/>
                      }
                      <MyTextInput label={"Contrase??a"} name="password"  type={!showPassword ? "password" : "text" } placeholder="Contrase??a"/>
                    </div>
                    <MyTextInput label={"Confirmar Contrase??a"} name="password2" type="password"  placeholder="Confirmar Contrase??a "/>
                  </div>

                  <p className='text-center text-sm'>Indique si es un cliente extranjero(externo) o nacional(local)</p>
                  <div className='flex gap-12'>
                    <MyRadioButton name="tipo" label={"Local"} value="local"/>
                    <MyRadioButton name="tipo" label={"Externo"} value="externo"/>
                  </div>
                  {values.tipo === "local" && (
                    <>
                      <MyTextInput label={"Rut"} name="rut" maxLength={10}  placeholder="Rut ej: 11111111-k"/>
                      <p className='text-sm'>Si su RUT termina en 0 reemplazalo con una k</p>
                    </>
                  )}        
                  <button className="cursor-pointer hover:bg-blue-600  text-center rounded-lg bg-blue-500 text-white px-8 py-4" type='submit'>Registrar</button>

                </Form>
              )
            }
      </Formik>
    </div>
    
    
    </div>
  )
}

export default Registrar