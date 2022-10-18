import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { agregarProducto } from "../../Helpers/getProductores";
import useAuth from "../../Hooks/useAuth";

const ModalProducto = ({handleModal, setActiveModal,}) => {

 const [formValues, setFormValues] = useState({
    nombre: '',
    cantidad: '',
    precio_local: '',
    precio_ext: '',
    calidad: ''
 })
const {config} = useAuth();
 const {nombre, calidad, precio_local, precio_ext, cantidad} = formValues;
 const [alerta, setAlerta] = useState({msg: '', error: false});
 const [selectedFile, setSelectedFile] = useState(null);
//  const [fileInputTitle, setFileInputTitle] = useState("");
 const handleOnChange = ({target}) =>{
    setFormValues({...formValues,
        [target.name]: target.value
    })
 }

 const onChangeInpuFile = (e) => {
  setSelectedFile(e.target.files[0]);
  // const inputTitle = e.target.files[0].name;
//   setFileInputTitle(inputTitle);

//   console.log(inputTitle);
// }
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




    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.set('Nombre', formValues.nombre.toLowerCase() );
    formData.set('Cantidad', formValues.cantidad);
    formData.set('Precio_local', formValues.precio_local);
    formData.set('Precio_ext', formValues.precio_ext);
    formData.set('Calidad', formValues.calidad);




    await agregarProducto(formData, config);
    setAlerta({msg: 'Añadido Correctamente', error: false});
    setTimeout(() => {
        setActiveModal(false)
        window.location.reload();

    }, 2000);
}
  return (
    <>
   
    <div className="absolute sm:w-1/4 w-5/6 h-auto top-32 sm:top-40 text-center px-4 py-4 bg-white border-1 border border-gray-500 rounded-xl right-0 left-0 mr-auto ml-auto">
        <p className="font-bold text-xl mb-4 mt-4 font-sans">Agrega tu Producto</p>
        {
          alerta.msg.length > 2 && (<p className={alerta.error === false ?"px-4 py-1 bg-green-500 text-white font-semibold text-lg rounded-lg" :
          "px-4 py-1 bg-red-500 text-white font-semibold text-lg rounded-lg"
        }>{alerta.msg}</p>) 
            
        }
        <button onClick={handleModal} className="bg-red-500 sm:w-auto w-16 text-sm absolute top-1 left-1 rounded-md  px-2 py-1 text-white ">
            <FontAwesomeIcon className="sm:mr-1 " icon={faClose}/>
            Cerrar
        </button>

      <div className="flex flex-col gap-8 items-center">
      <div className="flex flex-col w-2/3">
          <label className="text-left">Imagen</label>
          <input
        className='file-input sm:w-auto ' type="file" onChange={onChangeInpuFile} 
          />
        </div>
        <div className="flex flex-col ">
          <label className="text-left">Nombre</label>
          <input
            name="nombre"
            onChange={handleOnChange}
            className="bg-gray-50 border-1 pl-1 border-gray-500 border rounded-sm"
            value={nombre}
          />
        </div>
        <div className="flex flex-col ">
          <label className="text-left">Cantidad</label>
          <input
            name="cantidad"
            onChange={handleOnChange}

            className="bg-gray-50 border-1 pl-1 border-gray-500 border rounded-sm"
            value={cantidad}
          />
        </div>
        <div className="flex flex-col ">
          <label className="text-left">Precio Local</label>
          <input
            name="precio_local"
            onChange={handleOnChange}

            className="bg-gray-50 border-1 pl-1 border-gray-500 border rounded-sm"
            value={precio_local}
          />
        </div>
        <div className="flex flex-col ">
          <label className="text-left">Precio exportacion</label>
          <input
            onChange={handleOnChange}

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
