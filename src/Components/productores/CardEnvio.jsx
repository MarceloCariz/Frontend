import React from 'react'

const CardEnvio = ({ele}) => {

    console.log(ele)
  return (
    <div key={ele[0].REFERENCIA_COMPRA} className="sm:w-2/5 flex flex-col text-left justify-center items-center mb-4 rounded-lg bg-white shadow-xl px-4 py-4">
    <div className="flex gap-2 sm:text-xl capitalize font-semibold items-center ">
      <p>
        Numero pedido{" "}
        <span className="text-black font-bold">#{ele[0].REFERENCIA_COMPRA}</span>{" "}
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
            <span
              className={
                (ele[0].ESTADO_ENVIO === "pendiente" &&
                  "bg-yellow-400 px-1 py-1 sm:h-10 rounded-lg ") ||
                (ele[0].ESTADO_ENVIO === "asignado" &&
                  "bg-green-600")
              }
            >
              {ele[0].ESTADO_ENVIO}
            </span>
          </p>
          
        )}

      </div>

      </div>
      <div className="flex gap-12 mt-4  sm:ml-32 animate__animated animate__fadeIn ">
                   <table className="flex flex-col gap-2 table-auto ">
                   <thead >
                          <tr className="flex text-xl  justify-between gap-12  text-center    items-center">
                            <th className="">Nombre Producto </th>
                            <th className="">Cantidad </th>
                            {/* <th>Fecha Compra </th> */}
                          </tr>
                    </thead>
                    {ele.map((e, i) => (

                        <tbody key={i}>
                          <tr className="flex capitalize justify-between  text-center    items-center text-sm">
                            <th>{e.NOMBRE_PRODUCTO}</th>
                            <th>{e.CANTIDAD} kg</th>
                          </tr>
                        </tbody>
                      ))}
                      </table>
                    </div>
    </div>
  )
}

export default CardEnvio