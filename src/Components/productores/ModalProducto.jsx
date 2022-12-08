import { faClose, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from "react";
import { useEffect } from "react";
import { agregarProducto, listarNombresProductos } from "../../Helpers/getProductores";
import useAuth from "../../Hooks/useAuth";
import useConsultas from "../../Hooks/useConsultas";
import { MySelect } from "../formik/MySelect";
import { MyTextInput } from "../formik/MyTextInput";

const ModalProducto = ({handleModal, setActiveModal,}) => {

  const [nombres, setNombres] = useState([]);
    useEffect(()=>{
      const cargarNombres= async() =>{
        const resp = await listarNombresProductos();
        setNombres(resp);
      }
      cargarNombres();
    },[])
  const {config} = useAuth();
  const {  cargarProductosProductor} = useConsultas();

  const [alerta, setAlerta] = useState({msg: '', error: false});
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagenInfo, setImagenInfo] = useState(null)


  const onChangeInpuFile = (e) => {
    const imagen = e.target.files[0];
    setSelectedFile(imagen);
    const reader = new FileReader();
    reader.onload = (e) =>{
      const { result} = e.target;
      setImagenInfo(result);
    }
    reader.readAsDataURL(imagen);

  }
  const handleSubmit = async(values, resetForm) =>{

      if(selectedFile === null){
        setAlerta({msg:"Por favor seleccione una imagen", error: true})
        setTimeout(() => {
          setAlerta({msg: '', error: false}); 
        }, 2000);
        return;
      }
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('nombre', values.nombre.toLowerCase() );
      formData.append('cantidad', values.cantidad);
      formData.append('precio_local', values.precio_local);
      formData.append('precio_ext', values.precio_ext);
      formData.append('calidad', values.calidad);

      // console.log(formData.)


      await agregarProducto(formData, config);
      setAlerta({msg: 'Añadido Correctamente', error: false});
      setTimeout(() => {
          // setActiveModal(false)
          setImagenInfo(null);
          setSelectedFile(null);
          setAlerta({msg: '', error: false}); 
          resetForm();
          cargarProductosProductor();
      }, 2000);
    }
  return (
    <>
   
    <div className="absolute 2xl:w-1/4 lg:w-2/4 md:w-3/5 w-5/6 h-auto top-32 sm:top-40 text-center px-4 py-4 bg-white border-1 border border-gray-500 rounded-xl right-0 left-0 mr-auto ml-auto">
        <p className="font-semibold text-2xl mb-4 mt-12 font-sans md:mt-4 ">Agrega tu Producto</p>
        {
          alerta.msg.length > 2 && (<p className={alerta.error === false ?"px-4 py-1 bg-green-500 text-white font-semibold text-lg rounded-lg" :
          "px-4 py-1 bg-red-500 text-white font-semibold text-lg rounded-lg"
        }>{alerta.msg}</p>) 
            
        }
        <button onClick={handleModal} className="bg-red-500 sm:w-auto w-16 text-sm absolute top-1 left-1 rounded-md  px-2 py-1 text-white ">
            <FontAwesomeIcon className="sm:mr-1 " icon={faClose}/>
            Cerrar
        </button>

      <div className="flex flex-col gap-8 items-center mt-12">
            {/* FOTO */}
              {imagenInfo !== null &&(
                  <img src={imagenInfo} alt="imagen" width={"100"} />)
              }
          <div className="flex  flex-col justify-center text-center">

                <label className="px-4 py-2 bg-slate-600 text-white"  htmlFor="file">
                  <FontAwesomeIcon className="mr-2" icon={faImage}/>
                  {selectedFile !== null ? "Imagen subida" : "Haz Click Aqui para subir tu imagen"}</label>

              <input style={{display: 'none'}} id="file" className='file-input sm:w-auto'  type="file" onChange={onChangeInpuFile} />
          </div>
            {/* FIN FOTO */}

            {/* FORMIK */}
        <Formik 
            initialValues={{nombre: '', cantidad: 0, precio_local: 0, precio_ext: 0, calidad: ''}}
            onSubmit={(values,{resetForm}) => handleSubmit(values, resetForm)}
            validationSchema={
              Yup.object({
                nombre: Yup.string().oneOf(nombres.map(({NOMBRE})=>(NOMBRE))).required('Este campo es requerido'),
                cantidad: Yup.number("Debe ser numeros").min(1,"Debe ser mayor a cero").max(100000,"El valor debe ser menos de 100.000" ).required("Este campo es requerido"),
                precio_local: Yup.number("Debe ser numeros").min(1,"Debe ser mayor a cero").max(100000,"El valor debe ser menos de 100.000" ).required("Este campo es requerido"),
                precio_ext: Yup.number("Debe ser numeros").min(1,"Debe ser mayor a cero").max(100000,"El valor debe ser menos de 100.000" ).required("Este campo es requerido"),
                calidad: Yup.string().oneOf(["alta","media","baja"]).required("Este campo es requerido")

              })
            }
          >
          {()=>(
            <Form>
              <MySelect name="nombre" label="Nombre">
                  <option  value=""> Seleccione </option>
                  {
                    nombres.length > 0  && nombres.map(({ID, NOMBRE})=>(
                      <option key={ID} value={NOMBRE}>{NOMBRE}</option>
                    ))
                  }
              </MySelect>
              <div className="flex flex-col">
                <MyTextInput name="cantidad" label="Cantidad"  type="number" />
              </div>
              <div className="flex flex-col">
                <MyTextInput name="precio_local" label="Precio local" type="number"/>
              </div>
              <div className="flex flex-col">
                <MyTextInput name="precio_ext" label="Precio Externo" type="number"/>
              </div>

              <MySelect name="calidad" label="Calidad">
                <option value="">---Seleccione---</option>
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </MySelect>
              <button className=' bg-blue-500 text-white w-auto sm:px-12 sm:py-4 px-4 py-2 font-semibold mt-12'>Agregar Producto</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </>

  );
};

export default ModalProducto;
