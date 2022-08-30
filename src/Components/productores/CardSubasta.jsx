import React from "react";

const CardSubasta = ({subasta, minutos, resultado, alerta, handleClick, hora}) => {

  const {ID, NOMBRE_PRODUCTO, REFERENCIA_COMPRA,FECHA_ACTIVACION} = subasta
  return (
    <div >
      {alerta && alerta.id === ID && <p className="bg-red-500">{alerta.msg}</p>}
      <p>Productos Necesarios : {NOMBRE_PRODUCTO}</p>
      {/* disabled={minutos === null ? true : false} */}
      <button
        onClick={(e) =>
          handleClick(
            { REFERENCIA_COMPRA, FECHA_ACTIVACION, NOMBRE_PRODUCTO, ID },
            e
          )
        }
        className="bg-green-500 px-4 py-2 text-white"
      >
        POSTULAR
      </button>
      <p>{minutos === null ? "" : hora}</p>
      <p>
        {minutos === null
          ? "Subasta Finalizada"
          : minutos.toFixed(0) + " minutos para finalizar"}{" "}
      </p>
      <p className="bg-gray-400 px-2 ">Tus productos Seleccionados</p>
      <div className="flex ">
        {resultado.length > 0 &&
          resultado.map((producto) => (
            <div className="text-center  mb-4 ">
              <p>Nombre: {producto.NOMBRE}</p>
              <p>Precio_exp: {producto.PRECIO_EXP}</p>
              <hr className="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardSubasta;
