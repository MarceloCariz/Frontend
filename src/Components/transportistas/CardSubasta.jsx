import React, {  useState } from "react";
import useTimeT from "../../Hooks/useTimeT";

const CardSubasta = ({subasta,  socket,  auth,  perfil  }) => {
  const [alerta, setAlerta] = useState({msg:'', id: 0, tipo:null});
  const {ID, NOMBRE_PRODUCTO, REFERENCIA_COMPRA,FECHA_ACTIVACION, CANTIDAD , REFRIGERACION} = subasta[0];
  const {minutos, hora, resultado } = useTimeT( new Date(FECHA_ACTIVACION), socket,  auth, REFERENCIA_COMPRA, CANTIDAD);

  const cantidadCarga = subasta.reduce((total, actual)=>( Number(actual.CANTIDAD)+ Number(actual.CANTIDAD) ),0);
  const handleClick = (e) =>{
     if(perfil.CARGA < cantidadCarga){
      setAlerta({msg: 'Carga insuficiente', id: ID, tipo: false});
      return;
     }
     if(perfil.REFRIGERACION !== REFRIGERACION){
      setAlerta({msg: 'Refrigeración no compatible',id: ID, tipo: false});
      return;
     }
    // console.log(REFERENCIA_COMPRA);
    // console.log();
  //   const existe  = productos.some(({NOMBRE})=>(NOMBRE === NOMBRE_PRODUCTO));
  //   if(!existe){
  //     setAlerta({msg: 'no tienes este producto', id: ID, tipo: false});
  //     return
  //   }
    setAlerta({msg: 'Postulación exitosa', id: ID, tipo: true});

    socket && socket.emit('postularT', {...perfil, REFERENCIA_COMPRA});
  }



  return (
    <div className="w-auto bg-white px-4 pt-8 rounded-lg shadow-md">
      {alerta && alerta.id === ID &&   <p className={alerta.tipo ? "bg-green-500 text-white capitalize" : "bg-red-500 text-white capitalize px-2"}>{alerta.msg}</p>}
      <p className="text-left font-bold">Número de Orden #{REFERENCIA_COMPRA}</p>
      <p className="">Productos Necesarios : </p>
      {subasta.map((ele, i)=>(
        <div key={i}>
          <p className="capitalize font-semibold">{ele.NOMBRE_PRODUCTO}</p>
        </div>
      ))}
      <p>Total de carga: {cantidadCarga}</p>

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
          : (minutos  > 1? minutos.toFixed(0) : (minutos * 60).toFixed(0)) + " " +(Number(minutos)  > 1 ?  (minutos > 1 && minutos < 2 ? "Minuto restante" : "Minutos restantes") : "segundos restantes")}
      </p>
      <div>
        {resultado.mensaje.length > 0  && resultado.idcompra === REFERENCIA_COMPRA &&
        <p className="bg-green-500 px-4 py-2 text-white">{resultado.mensaje}</p>
        }
      </div>
    </div>
  );
};

export default CardSubasta;
