import { faTruckRampBox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { confirmarEnvioBodega } from "../../Helpers/getProductores";
import useConsultas from "../../Hooks/useConsultas";
import { Spinnner } from "../ui/Spinnner";

const CardEnvio = ({ ele, config }) => {
  const [cargando, setCargando] = useState(false);
  const {cargarEnviosProductor} = useConsultas();

  const handleEnviarBodega = async(e) =>{
    setCargando(true);
    const respuesta = await confirmarEnvioBodega(e, config);
    console.log(respuesta)
    cargarEnviosProductor();
    setCargando(false);

  }
  return (
    <div
      key={ele[0].REFERENCIA_COMPRA}
      className="sm:w-2/5 flex flex-col text-left justify-center items-center mb-4 rounded-lg bg-white shadow-xl px-4 py-4"
    >
      <div className="flex gap-2 sm:text-xl capitalize font-semibold items-center ">
        <p>
        Número pedido{" "}
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
              Estado de envió:{" "}
              <span className="ml-2">
                {ele[0].ESTADO_ENVIO}
              </span>
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 font-bold">
        <p>{ele[0].FECHA_COMPRA}</p>
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
        {
            ele[0].ESTADO_PAGO !== 'RECHAZADO' && (
                <div className="flex flex-col gap-2 mt-4">
                  <p>Si sus productos ya están en bodega favor de confirmar</p>

                      <button disabled={ele[0].ESTADO_ENVIO === 'asignado' ? false : true } onClick={(e) => handleEnviarBodega(ele[0].REFERENCIA_COMPRA, e)} 
                         className={ele[0].ESTADO_ENVIO === 'asignado' ? "text-white bg-yellow-500 h-12 px-2 rounded-lg font-semibold" : "text-white bg-yellow-500/50  h-12 px-2 rounded-lg font-semibold"}>
                        {cargando ? <Spinnner/> : <FontAwesomeIcon className="mr-2" icon={faTruckRampBox}/> }
                        {ele[0].ESTADO_ENVIO === 'asignado' ? (cargando ? "Confirmando envio a bodega ..." : "Confirmar envio a bodega") : "Productos confirmados" }
                        
                      </button>

                </div>
            )
          }

      </div>
    </div>
  );
};

export default CardEnvio;
