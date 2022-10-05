import React, {  useState } from "react";
import useTimeT from "../../Hooks/useTimeT";

const CardSubasta = ({subasta,  socket,  auth, productos, perfil  }) => {
  
  const [alerta, setAlerta] = useState({msg:'', id: 0, tipo:null});
  const {ID, NOMBRE_PRODUCTO, REFERENCIA_COMPRA,FECHA_ACTIVACION, CANTIDAD } = subasta;
  console.log(perfil.CARGA)
  const {minutos, hora, } = useTimeT( new Date(FECHA_ACTIVACION), socket,  auth, REFERENCIA_COMPRA, CANTIDAD);
  const handleClick = (e) =>{
    // console.log(REFERENCIA_COMPRA);
    // console.log();
  //   const existe  = productos.some(({NOMBRE})=>(NOMBRE === NOMBRE_PRODUCTO));
  //   if(!existe){
  //     setAlerta({msg: 'no tienes este producto', id: ID, tipo: false});
  //     return
  //   }
    setAlerta({msg: 'Postulacion  exitosa', id: ID, tipo: true});

    socket && socket.emit('postularT', perfil);
  }



  return (
    <div className="w-auto bg-white px-4 pt-8 rounded-lg shadow-md">
      {alerta && alerta.id === ID &&   <p className={alerta.tipo ? "bg-green-500 text-white capitalize" : "bg-red-500 text-white capitalize"}>{alerta.msg}</p>}
      <p className="text-left font-bold">Numero de Orden #{REFERENCIA_COMPRA}</p>
      <p className="">Productos Necesarios : </p>
      <p className="capitalize font-semibold">{NOMBRE_PRODUCTO}</p>
      {/* disabled={minutos === null ? true : false} */}
      <button
        disabled ={minutos === null ? true : false}
        onClick={(e) =>
          handleClick(
            { REFERENCIA_COMPRA, FECHA_ACTIVACION, NOMBRE_PRODUCTO, ID },
            e
          )
        }
        className={minutos === null ? " rounded-md bg-red-500 px-4 py-2 text-white"  : "cursor-pointer hover:-translate-y-1 hover::bg-green-600  rounded-md bg-green-500 px-4 py-2 text-white"}
      >
        {minutos === null
          ? "Subasta Finalizada" :
        "POSTULAR"}
      </button>
      <p>{minutos === null ? "" : hora}</p>
      <p>
        {minutos === null
          ? "Subasta Finalizada"
          : minutos.toFixed(0) + " minutos para finalizar"}{" "}
      </p>
      <p className="bg-gray-400 px-2 ">Tus productos Seleccionados</p>
      {/* <div className="flex flex-col  ">
        {resultado.length > 0 &&
          resultado.map((producto) => (
            <div className="  mb-2 ">
              <p className="bg-green-500 text-white text-center px-2  rounded-lg"> {producto.NOMBRE === NOMBRE_PRODUCTO ? 
              
               producto.NOMBRE : ''}</p>
            </div>
          ))}
      </div> */}
    </div>
  );
};

export default CardSubasta;
