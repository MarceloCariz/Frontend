import React from 'react'

export const CardGanancia = ({envios}) => {
  return (
    <div className='overflow-y-auto sm:h-72 h-52 '>
      <table className="sm:table-fixed table-auto sm:text-lg text-sm  sm:w-full ">
      <thead>
        <tr>
          <th>ID</th>
          <th>NOMBRE</th>
          <th>CANTIDAD</th>
          <th>PRECIO</th>
          <th>PRECIO TOTAL</th>
          <th>ID COMPRA</th>
        </tr>
      </thead>

      <tbody className="text-center b ">
        
        {
          envios.length > 0  ?
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
                <td>
                  {(PRECIO * Number(CANTIDAD)).toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </td>
                <td className="">#{REFERENCIA_COMPRA}</td>
              </tr>
            )): (
              <tr>
                <td>No hay</td>
              </tr>
            )}
          
      </tbody>

    </table>
  </div>
  )
}
