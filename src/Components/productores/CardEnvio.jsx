import { faTruckRampBox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { confirmarEnvioBodega } from "../../Helpers/getProductores";

const CardEnvio = ({ ele, config }) => {
  const handleEnviarBodega = async(e) =>{

    const respuesta = await confirmarEnvioBodega(e, config);
    console.log(respuesta)
    window.location.reload();
  }
  return (
    <div
      key={ele[0].REFERENCIA_COMPRA}
      className="sm:w-2/5 flex flex-col text-left justify-center items-center mb-4 rounded-lg bg-white shadow-xl px-4 py-4"
    >
      <div className="flex gap-2 sm:text-xl capitalize font-semibold items-center ">
        <p>
          Numero pedido{" "}
          <span className="text-black font-bold">
            #{ele[0].REFERENCIA_COMPRA}
          </span>{" "}
        </p>

        <div
          className={
            ele[0].ESTADO_PAGO === "RECHAZADO"
              ? "bg-red-600 px-2 py-2 rounded-lg capitalize text-white"
              : "bg-green-600  text-white px-2 py-2 rounded-lg capitalize"
          }
        >
          {ele[0].ESTADO_PAGO === "RECHAZADO" ? (
            "Estado de envio: CANCELADO"
          ) : (
            <p className="flex   sm:flex-row sm:gap-0 flex-col gap-1">
              Estado de envio:{" "}
              <span className="ml-2">
                {ele[0].ESTADO_ENVIO}
              </span>
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-4 mt-4  sm:ml-12 animate__animated animate__fadeIn ">
        <table className="flex flex-col gap-2 table-auto ">
          <thead>
            <tr className="flex   justify-between gap-4  text-center    items-center">
              <th className="">Nombre Producto </th>
              <th className="">Cantidad </th>
              {/* <th>Fecha Compra </th> */}
            </tr>
          </thead>
          {ele.map((e, i) => (
            <tbody key={i}>
              <tr className="flex capitalize justify-between  w-full   items-center text-sm">
                <th>{e.NOMBRE_PRODUCTO}</th>
                <th>{e.CANTIDAD} kg</th>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="flex flex-col gap-2 mt-4">
          <p>Si sus productos ya estan en bodega favor de confirmar</p>
          <button disabled={ele[0].ESTADO_ENVIO === 'asignado' ? false : true } onClick={(e) => handleEnviarBodega(ele[0].REFERENCIA_COMPRA, e)} className="text-white bg-yellow-500 h-12 px-2 rounded-lg font-semibold">
            <FontAwesomeIcon className="mr-2" icon={faTruckRampBox}/>
            {ele[0].ESTADO_ENVIO === 'asignado' ? "Confirmar envio a bodega" : "Productos confirmados" }
            
          </button>
        </div>

      </div>
    </div>
  );
};

export default CardEnvio;