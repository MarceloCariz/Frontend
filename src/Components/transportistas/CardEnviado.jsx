import { faTruckRampBox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { confirmarEnvioEnviado } from "../../Helpers/getTransportista";
import useConsultas from "../../Hooks/useConsultas";
import { Spinnner } from "../ui/Spinnner";

const CardEnviado = ({ ele, config }) => {
  const [cargando, setCargando] = useState(false);

  const {cargarEnviosTransportista} = useConsultas();

  const handleEnviarAceptado = async(e) =>{
    setCargando(true);
    const respuesta = await confirmarEnvioEnviado(e, config);
    console.log(respuesta)
    cargarEnviosTransportista();
    setCargando(false);
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
      <div className="sm:flex gap-4 mt-4  sm:ml-2 animate__animated animate__fadeIn ">
        <table className=" table-fixed sm:w-1/2  ">
          <thead>
            <tr className="text-center">
              <th className="">Nombre</th>
              <th className="">Cantidad </th>
              <th className="">Estado</th>
              {/* <th>Fecha Compra </th> */}
            </tr>
          </thead>
          {ele.map((e, i) => (
            <tbody key={i} >
              <tr className="text-center ">
                <th>{e.NOMBRE_PRODUCTO}</th>
                <th>{e.CANTIDAD} kg</th>
                <th className={e.ESTADO_ENVIO === 'asignado' ? "bg-red-500 text-white rounded-lg  " : "bg-green-500 text-white rounded-lg text-sm"}>{e.ESTADO_ENVIO}</th>
              </tr>
            </tbody>
          ))}
        </table>
        {
            ele[0].ESTADO_PAGO !== 'RECHAZADO' && (
                <div className="flex flex-col gap-2 mt-4">

                  <p>{ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'asignado')) ? "Aun faltan productos que esten en bodega": "Todos los productos se encuentran en bodega"}</p>

                      <button 
                          disabled={(ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'asignado' || ESTADO_ENVIO === 'recibido' || ESTADO_ENVIO === 'enviado')))   && true   } 
                          onClick={(e) => handleEnviarAceptado(ele[0].REFERENCIA_COMPRA, e)} 
                          className={(ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'asignado' || ESTADO_ENVIO === 'recibido' || ESTADO_ENVIO === 'enviado'))) ? "text-white bg-yellow-500/50  h-12 px-2 rounded-lg font-semibold"  : 
                          "text-white bg-yellow-500 h-12 px-2 rounded-lg font-semibold"}>
                        
                        
                        {cargando ? <Spinnner/> : <FontAwesomeIcon className="mr-2" icon={faTruckRampBox}/>}
                        {ele[0].ESTADO_ENVIO === 'aceptado' || ele[0].ESTADO_ENVIO === 'bodega' ? "Confirmar envio a cliente " : ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'asignado')) ? "Productos faltantes en bodega" :"Productos confirmados" }
                        
                      </button>

                </div>
            )
          }

      </div>
    </div>
  );
};

export default CardEnviado;
