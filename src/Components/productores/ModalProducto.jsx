import { faClose, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import { agregarProducto, listarNombresProductos } from "../../Helpers/getProductores";
import useAuth from "../../Hooks/useAuth";
import useConsultas from "../../Hooks/useConsultas";

const ModalProducto = ({handleModal, setActiveModal,}) => {

  const [formValues, setFormValues] = useState({
      nombre: '',
      cantidad: '',
      precio_local: '',
      precio_ext: '',
      calidad: ''
  })

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

  const {nombre, calidad, precio_local, precio_ext, cantidad} = formValues;
  const [alerta, setAlerta] = useState({msg: '', error: false});
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagenInfo, setImagenInfo] = useState(null)
  //  const [fileInputTitle, setFileInputTitle] = useState("");
  const handleOnChange = ({target}) =>{
      setFormValues({...formValues,
          [target.name]: target.value
      })
  }

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
  const handleSubmit = async(e) =>{
      e.preventDefault();

      if([nombre, calidad, precio_ext, precio_local, cantidad, ].includes("") || selectedFile === null){
        setAlerta({msg: 'Por favor llenar todos los campos', error: true});
        setTimeout(() => {
          setAlerta({msg: '', error: false});   
        }, 2000);
        return
      };

      if(cantidad > 100000  || precio_ext > 100000 || precio_local > 100000){
        setAlerta({msg: 'Valores muy alto de Cantidad, Precio Local o Precio Ext', error: true});
        setTimeout(() => {
          setAlerta({msg: '', error: false});   
        }, 2000);
        return;
      }





      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('nombre', formValues.nombre.toLowerCase() );
      formData.append('cantidad', formValues.cantidad);
      formData.append('precio_local', formValues.precio_local);
      formData.append('precio_ext', formValues.precio_ext);
      formData.append('calidad', formValues.calidad);

      // console.log(formData.)


      await agregarProducto(formData, config);
      setAlerta({msg: 'Añadido Correctamente', error: false});
      setTimeout(() => {
          setActiveModal(false)
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
            
              {imagenInfo !== null &&(
                  <img src={imagenInfo} alt="imagen" width={"100"} />)
              }
          <div className="flex  flex-col justify-center text-center">

                <label className="px-4 py-2 bg-slate-600 text-white"  htmlFor="file">
                  <FontAwesomeIcon className="mr-2" icon={faImage}/>
                  {selectedFile !== null ? "Imagen subida" : "Haz Click Aqui para subir tu imagen"}</label>

              <input style={{display: 'none'}} id="file" className='file-input sm:w-auto'  type="file" onChange={onChangeInpuFile} />
          </div>

        <div className="flex flex-col ">
          <label className="text-left font-semibold">Nombre</label>
          {/* <input
            name="nombre"
            onChange={handleOnChange}
            className="bg-gray-50 border-1 pl-1 border-gray-500 border rounded-sm"
            value={nombre}
          /> */}
          <select name="nombre" onChange={handleOnChange} className="w-52 h-12" defaultValue={""}>
              <option  value=""> Seleccione </option>
              {
                nombres.length > 0  && nombres.map(({ID, NOMBRE})=>(
                  <option key={ID} value={NOMBRE}>{NOMBRE}</option>
                ))
              }
          </select>
        </div>
        <div className="flex flex-col ">
          <label className="text-left">Cantidad</label>
          <input
            name="cantidad"
            onChange={handleOnChange}
            type="number"
            maxLength={10}
            className="bg-gray-50 border-1 pl-1 border-gray-500 border rounded-sm"
            value={cantidad}
          />
        </div>
        <div className="flex flex-col ">
          <label className="text-left">Precio Local</label>
          <input
            name="precio_local"
            onChange={handleOnChange}
            type="number"
            className="bg-gray-50 border-1 pl-1 border-gray-500 border rounded-sm"
            value={precio_local}
          />
        </div>
        <div className="flex flex-col ">
          <label className="text-left">Precio exportacion</label>
          <input
            onChange={handleOnChange}
            type="number"
            name="precio_ext"
            className="bg-gray-50 border-1 pl-1 border-gray-500 border rounded-sm"
            value={precio_ext}
          />
        </div>
        <div className="flex flex-col ">
          <label className="text-left">Calidad</label>
          {/* <input
            onChange={handleOnChange}

            name="calidad"
            className="bg-gray-50 border-1 pl-1 border-gray-500 border rounded-sm"
            value={calidad}
          /> */}
          <select className="mr-12" name="calidad" id="calidad" onChange={handleOnChange}>
            <option value="">---Seleccione---</option>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <form className="mt-14" onSubmit={handleSubmit} action="">
            <button className=' bg-blue-500 text-white w-auto sm:px-12 sm:py-4 px-4 py-2 font-semibold'>Agregar Producto</button>

        </form>
      </div>
    </div>
    </>

  );
};

export default ModalProducto;
