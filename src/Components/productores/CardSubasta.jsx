import React, {  useState } from "react";
import useTime from "../../Hooks/useTime";

const CardSubasta = ({subasta,  socket,  auth, productos, setResultado, resultado  }) => {
  const [alerta, setAlerta] = useState({msg:'', id: 0, tipo:null});

  const {ID, NOMBRE_PRODUCTO, REFERENCIA_COMPRA,FECHA_ACTIVACION} = subasta;

  const {minutos, hora,  } = useTime( new Date(FECHA_ACTIVACION), socket,  auth, REFERENCIA_COMPRA , NOMBRE_PRODUCTO, resultado, setResultado, ID);




  const handleClick = (e) =>{
    console.log(REFERENCIA_COMPRA);
    const existe  = productos.some(({NOMBRE})=>(NOMBRE === NOMBRE_PRODUCTO));
    if(!existe){
      setAlerta({msg: 'No tienes este producto', id: ID, tipo: false});
      return
    }
    setAlerta({msg: 'Postulacion  exitosa', id: ID, tipo: true});
    // const prodRef = productos.map((ele) => ({...ele, REFERENCIA_COMPRA}));
    const producto = productos.find(({NOMBRE})=>(NOMBRE === NOMBRE_PRODUCTO));
    // console.log(producto)
    socket && socket.emit('postular',{...producto, REFERENCIA_COMPRA,idSubasta: ID}, new Date(FECHA_ACTIVACION), REFERENCIA_COMPRA);
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
          : minutos.toFixed(0) + "Minutos para finalizar"}{" "}
      </p>
    </div>
  );
};

export default CardSubasta;
