import React from "react";
import { BotonVerCerrar } from "./BotonVerCerrar";

export const Cabecera = ({ i, idPedido, onClick, show, ele }) => {
  return (
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
          "Estado de envío: CANCELADO"
        ) : (
          <div className="flex   sm:flex-col sm:gap-1 flex-col gap-1">
            <p className="text-sm">Estado de envío </p>
            <p
              className={
                ele.some(({ ESTADO_ENVIO }) => ESTADO_ENVIO === "pendiente")
                  ? "bg-yellow-400 px-1 py-1 sm:h-10 rounded-lg   "
                  : "bg-green-600"
              }
            >
              {ele.some(({ ESTADO_ENVIO }) => ESTADO_ENVIO === "pendiente")
                ? "pendiente"
                : ele[0].ESTADO_ENVIO}
            </p>
            <p className="flex">
              {ele.some(({ ESTADO_ENVIO }) => ESTADO_ENVIO === "pendiente")
                ? ele.filter(
                    (e) => e.ESTADO_ENVIO === "pendiente" && e.ESTADO_ENVIO
                  ).length + " pedidos"
                : ""}
            </p>
          </div>
        )}
      </div>

      <p
        className={
          ele[0].ESTADO_PAGO === "RECHAZADO"
            ? "bg-red-600 px-2 py-2 rounded-lg capitalize text-white"
            : "bg-green-600  text-white px-2 py-2 rounded-lg capitalize"
        }
      >{`Estado de pago: ${ele[0].ESTADO_PAGO}`}</p>

      <BotonVerCerrar i={i} idPedido={idPedido} onClick={onClick} show={show} />
    </div>
  );
};
