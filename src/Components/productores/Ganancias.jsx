import React from "react";
import { Spinnner } from "../ui/Spinnner";

export const Ganancias = ({ ganancia, sueldo, envios, cargando, rol }) => {
  return (
    <div className="border border-1  sm:w-1/2 w-auto px-10 py-10 bg-white rounded-lg shadow-md flex items-center flex-col gap-2 ">
      <p className="text-3xl font-semibold flex items-center gap-2">
        Ganancias:{" "}
        <span className="font-normal">
          {sueldo ? ganancia : <Spinnner color={"black"} tamano={5} />}
        </span>
      </p>
      <div className="w-full ">
        <h3 className="text-center text-xl">Pedidos Completados</h3>
        <div className="flex items-center  flex-col mt-2  overflow-x">
          {cargando ? (
            <Spinnner />
          ) : (

            <table className="sm:table-fixed table-auto sm:text-lg text-sm overflow-scroll w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOMBRE</th>
                  <th>CANTIDAD</th>
                  <th>PRECIO</th>
                  <th>ID COMPRA</th>
                </tr>
              </thead>
              <tbody className="text-center overflow-y h-12">
                {rol === 'productor' && envios.length > 0  ?  (
                  envios.map(
                    ({
                      ID,
                      ID_PRODUCTO,
                      NOMBRE_PRODUCTO,
                      PRECIO,
                      REFERENCIA_COMPRA,
                      CANTIDAD,
                    }) => (
                      <tr key={ID}>
                        <td>{ID_PRODUCTO}</td>
                        <td>{NOMBRE_PRODUCTO}</td>
                        <td>{CANTIDAD}</td>
                        <td>
                          {Number(PRECIO).toLocaleString("es-CL", {
                            style: "currency",
                            currency: "CLP",
                          })}
                        </td>
                        <td className="">#{REFERENCIA_COMPRA}</td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td>No hay</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
