import React from "react";
import { CardGananciaT } from "../transportistas/CardGananciaT";
import { Spinnner } from "../ui/Spinnner";
import { CardGanancia } from "./CardGanancia";


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
        <div className="flex items-center  flex-col mt-2  overflow-x ">
          {cargando && (
            <Spinnner />
          ) }
          
          
          
          {rol === 'productor' && envios.length > 0  && (
              <CardGanancia envios={envios}/>
          )}
          {rol === 'transportista' && envios.length > 0 && (
              <CardGananciaT envios={envios}/>
          )}
        </div>
      </div>
    </div>
  );
};
