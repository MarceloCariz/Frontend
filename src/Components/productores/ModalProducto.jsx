import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { agregarProducto } from "../../Helpers/getProductores";

const ModalProducto = ({handleModal, setActiveModal,}) => {

 const [formValues, setFormValues] = useState({
    nombre: '',
    cantidad: '',
    precio_local: '',
    precio_ext: '',
    calidad: ''
 })

 const {nombre, calidad, precio_local, precio_ext, cantidad} = formValues;
 const [alerta, setAlerta] = useState('')
 const handleOnChange = ({target}) =>{
    setFormValues({...formValues,
        [target.name]: target.value
    })
 }
const handleSubmit = async(e) =>{
    e.preventDefault();


    const resultado = await agregarProducto(formValues);
    setAlerta(resultado)
    setTimeout(() => {
        setActiveModal(false)    
    }, 2000);
}
  return (
    <>
   
    <div className="absolute w-1/4 h-auto text-center px-4 py-4 bg-white border-1 border border-black rounded-xl right-0 left-0 mr-auto ml-auto">
        <p className="font-semibold text-xl mb-4">Agrega tu Producto</p>
        {
            alerta && (<p className="px-4 py-1 bg-green-500 text-white font-semibold text-lg rounded-lg">{alerta}</p>)
        }
        <button onClick={handleModal} className="bg-red-500 absolute top-1 left-1 rounded-md  px-2 py-1 text-white ">
            <FontAwesomeIcon className="mr-1" icon={faClose}/>
            Cerrar
        </button>

      <div className="flex flex-col gap-8 items-center">
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
          <input
            onChange={handleOnChange}

            name="calidad"
            className="bg-gray-50 border-1 pl-1 border-gray-500 border rounded-sm"
            value={calidad}
          />
        </div>
        <form onSubmit={handleSubmit} action="">
            <button className='bg-blue-500 text-white w-auto px-4 py-2 font-semibold'>Agregar Producto</button>

        </form>
      </div>
    </div>
    </>

  );
};

export default ModalProducto;
