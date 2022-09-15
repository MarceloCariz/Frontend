import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { actualizarProducto, eliminarProducto } from "../../Helpers/getProductores";
import useAuth from "../../Hooks/useAuth";

const Productos = ({ producto, setReload ,reload}) => {
  const {
    CANTIDAD,
    NOMBRE,
    PRECIO_EXP,
    PRECIO_LOCAL,
    ID_PRODUCTO,
    CALIDAD,
    IMAGE_URL
  } = producto;
  const [activeEditar, setActiveEditar] = useState('bg-blue-500');
  const {  config} = useAuth();
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
      [target.name]: target.value.toLowerCase() 
    })
    
    setActiveEditar('bg-green-500')
    // console.log(productoActualizado)
  }

  const handleEditar = async(e) => {
    e.preventDefault();
    setActiveEditar('bg-blue-500')
    const resultado = await actualizarProducto(productoActualizado, config)
    setAlerta(resultado.msg)
    setTimeout(() => {
        setAlerta('')
      setReload(!reload)

    }, 2000);
  };
  const handleDelete = async() => {
    const respuesta = await eliminarProducto(ID_PRODUCTO, config)
    setAlerta(respuesta.msg)
    setTimeout(() => {
      setAlerta('')
      // setReload(!reload)
      window.location.reload();
  }, 2000);
  };
  return (
    <div className="sm:w-auto  px-2 py-4 rounded-md shadow-xl  flex flex-col items-center justify-center bg-white">
      {alerta && (<p className="px-4 py-1 bg-green-500 text-white font-semibold text-lg rounded-lg">{alerta}</p>)}
      
      <div className="flex flex-col gap-4">
        <img className="object-contain w-52 h-52" src={IMAGE_URL} alt="imagen" />
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
          {/* <input name="calidad" onChange={handleOnchange} className="bg-gray-50 border-1 pl-1 border-gray-500 border rounded-sm" id={`${CALIDAD}`} value={calidad} /> */}
        
          <select className="mr-12" name="calidad" id="calidad" onChange={handleOnchange}>
            <option value="">{calidad}</option>
            {calidad === 'baja' && 
                      <>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                      </>
            }
            {calidad === 'media' && 
                      <>
                        <option value="baja">Baja</option>
                        <option value="alta">Alta</option>
                      </>
            }
             {calidad === 'alta' && 
                      <>
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>

                      </>
            }

          </select>
        </div>

      </div>
      <div className="flex gap-4 mt-4">
            <form onSubmit={handleEditar}>
            <button className={` hover:-translate-y-1 hover:bg-blue-600 px-4 py-2 text-white flex gap-1 items-center justify-center rounded-lg ${activeEditar}`} onClick={handleEditar}>
            <FontAwesomeIcon className="text-white" icon={faPencil}/>
            Editar</button>
            </form>
     

      
  


        <button  className="hover:-translate-y-1 hover:bg-red-600 bg-red-500 px-4 py-2 text-white flex gap-2 items-center justify-center rounded-lg" onClick={handleDelete}>
        <FontAwesomeIcon className="text-white" icon={faTrash}/>
          
          Eliminar</button>
      </div>
    </div>
  );
};

export default Productos;
