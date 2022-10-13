import React from "react";

export const InformacionPedido = ({informacion}) => {
  return (
    <div className="flex gap-12 mt-4  sm:ml-16 animate__animated animate__fadeIn mb-4   ">
      <table className="flex flex-col gap-2 table-auto ">
        <thead>
          <tr className="flex sm:text-xl  justify-between gap-12  text-center   items-center">
            <th className="">Nombre Producto </th>
            <th className="">Cantidad </th>
            <th>Precio</th>
            <th>Estado</th>
            {/* <th>Fecha Compra </th> */}
          </tr>
        </thead>
        {informacion.map((e, i) => (
          <tbody key={i}>
            <tr className="flex capitalize sm:gap-32 justify-between sm:justify-start  sm:text-rigth   items-center text-sm">
              <th className="w-32">{e.NOMBRE_PRODUCTO}</th>
              <th>{e.CANTIDAD} kg</th>
              <th className="pl-4">{(e.PRECIO * e.CANTIDAD).toLocaleString("es-CL", {style: "currency", currency:"CLP"})}</th>
              <th>{e.ESTADO_ENVIO}</th>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};
