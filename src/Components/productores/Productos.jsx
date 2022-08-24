import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { actualizarProducto, eliminarProducto } from "../../Helpers/getProductores";

const Productos = ({ producto, setReload ,reload}) => {
  const {
    CANTIDAD,
    NOMBRE,
    PRECIO_EXP,
    PRECIO_LOCAL,
    ID_PRODUCTO,
    ID_PRODUCTOR,
    CALIDAD
  } = producto;
  const [activeEditar, setActiveEditar] = useState('bg-blue-500');
  const [alerta, setAlerta] = useState('')
  const [productoActualizado, setProductoActualizado] = useState({
    cantidad : CANTIDAD,
    nombre:NOMBRE,
    precio_ext:PRECIO_EXP,
    precio_local: PRECIO_LOCAL,
    calidad: CALIDAD,
    id_producto : ID_PRODUCTO,
  })
  const {nombre, precio_ext, calidad, precio_local, cantidad} = productoActualizado;
  const handleOnchange = ({target})=>{
    setProductoActualizado({...productoActualizado,
      [target.name]: target.value
    })
    
    setActiveEditar('bg-green-500')
    // console.log(productoActualizado)
  }

  const handleEditar = async(e) => {
    e.preventDefault();
    setActiveEditar('bg-blue-500')
    const resultado = await actualizarProducto(productoActualizado)
    setAlerta(resultado.msg)
    setTimeout(() => {
        setAlerta('')
      setReload(!reload)

    }, 2000);
  };
  const handleDelete = async() => {
    const respuesta = await eliminarProducto(ID_PRODUCTO)
    setAlerta(respuesta.msg)
    setTimeout(() => {
      setAlerta('')
      setReload(!reload)
  }, 2000);
  };
  return (
    <div className="w-auto px-2 py-4 rounded-md shadow-xl  flex flex-col items-center justify-center bg-white">
      {alerta && (<p className="px-4 py-1 bg-green-500 text-white font-semibold text-lg rounded-lg">{alerta}</p>)}
      
      <div className="flex flex-col gap-4">

        <div className="flex flex-col ">
          <label className="text-left" htmlFor={`${nombre}`}>Nombre</label>
          <input name='nombre' onChange={handleOnchange} className="bg-gray-50 border-1 pl-1 border-gray-500 border rounded-sm" id={`${nombre}`} value={nombre} />
        </div>

        <div className="flex flex-col ">
          <label className="text-left"htmlFor={`${cantidad}`}>Cantidad</label>
          <input name="cantidad" type="number" onChange={handleOnchange}   className="bg-gray-50 border-1 pl-1 border-gray-500 border rounded-sm" id={`${cantidad}`}value={cantidad} />
        </div>

        <div className="flex flex-col ">
          <label className="text-left"htmlFor={`${PRECIO_EXP}`}>Precio Exportacion</label>
          <input name="precio_ext" type="number" onChange={handleOnchange} className="bg-gray-50 border-1 pl-1 border-gray-500 border rounded-sm" id={`${PRECIO_EXP}`} value={precio_ext} />
        </div>

        <div className="flex flex-col ">
          <label className="text-left"htmlFor={`${PRECIO_LOCAL}`}>Precio Local</label>
          <input name="precio_local" type="number"onChange={handleOnchange} className="bg-gray-50 border-1 pl-1 border-gray-500 border rounded-sm" id={`${PRECIO_LOCAL}`} value={precio_local} />
        </div>
        <div className="flex flex-col ">
          <label className="text-left"htmlFor={`${CALIDAD}`}>Calidad</label>
          <input name="calidad" onChange={handleOnchange} className="bg-gray-50 border-1 pl-1 border-gray-500 border rounded-sm" id={`${CALIDAD}`} value={calidad} />
        </div>

      </div>
      <div className="flex gap-4 mt-4">
            <form onSubmit={handleEditar}>
            <button className={`  px-4 py-2 text-white flex gap-1 items-center justify-center rounded-lg ${activeEditar}`} onClick={handleEditar}>
            <FontAwesomeIcon className="text-white" icon={faPencil}/>
            Editar</button>
            </form>
     

      
  


        <button  className="bg-red-500 px-4 py-2 text-white flex gap-2 items-center justify-center rounded-lg" onClick={handleDelete}>
        <FontAwesomeIcon className="text-white" icon={faTrash}/>
          
          Eliminar</button>
      </div>
    </div>
  );
};

export default Productos;
