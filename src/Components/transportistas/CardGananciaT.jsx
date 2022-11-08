import React from 'react'

export const CardGananciaT = ({envios}) => {
  return (
    <div className='overflow-y-auto sm:h-72 h-52 '>

    <table className="sm:table-fixed w-full ">
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
  </div>
  )
}
