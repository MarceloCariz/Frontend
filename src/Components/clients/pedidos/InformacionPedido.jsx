import React from "react";

export const InformacionPedido = ({informacion, total}) => {

  return (
    <div className="flex flex-col gap-12 mt-4   animate__animated animate__fadeIn mb-4   ">
      <table className=" table-fixed w-full ">
        <thead>
          <tr className="flex sm:text-xl  text-sm justify-between   text-center   items-center bg-slate-500 px-2 text-white">
            <th className="">Nombre </th>
            <th className="">Cantidad </th>
            <th>Precio</th>
            <th>Precio Unidad</th>

            <th>Estado</th>
            {/* <th>Fecha Compra </th> */}
          </tr>
        </thead>
        {informacion.map((e, i) => (
          <tbody key={i}>
            <tr className="flex sm:text-xl text-sm justify-between  text-right sm:ml-0   items-center">
              <th className="capitalize">{e.NOMBRE_PRODUCTO}</th>
              <th className="">{e.CANTIDAD} kg</th>
              <th className="flex gap-2 ">{(e.PRECIO * e.CANTIDAD).toLocaleString("es-CL", {style: "currency", currency:"CLP"})}</th>
              <th>{(e.PRECIO).toLocaleString("es-CL", {style: "currency", currency:"CLP"})}</th>

              <th>{e.ESTADO_ENVIO}</th>
            </tr>
          </tbody>
        ))}
      </table>
      <div>
      <h3 className="text-center text-lg">Precio total productos : <span className="font-bold">{total.toLocaleString("es-CL", {style: "currency", currency:"CLP"})}</span></h3>
      <h3 className="text-center text-lg">Precio Transporte : <span className="font-bold">{informacion[0].PRECIOT ? informacion[0].PRECIOT.toLocaleString("es-CL", {style: "currency", currency:"CLP"}) : "Por asignar"}</span></h3>
      </div>
     
    </div>
  );
};
