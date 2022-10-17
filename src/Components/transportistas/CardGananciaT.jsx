import React from 'react'

export const CardGananciaT = ({envios}) => {
  return (
    <table className="sm:table-fixed w-2/3 ">
    <thead>
      <tr>
        <th>Fecha Compra</th>
        <th>Precio</th>
        <th>Referencia Compra</th>
      </tr>
    </thead>
    <tbody className="text-center overflow-y h-12">
      {
        envios.length > 0  ?
        envios.map(
          ({
            REFERENCIA_COMPRA,
            FECHA_COMPRA,
            PRECIOT
          }) => (
            <tr key={REFERENCIA_COMPRA}>
              <td>{FECHA_COMPRA}</td>
              <td>{PRECIOT}</td>
              <td className="">#{REFERENCIA_COMPRA}</td>
            </tr>
          )): (
            <tr>
              <td>No hay</td>
            </tr>
          )}
        
    </tbody>
  </table>
  )
}
