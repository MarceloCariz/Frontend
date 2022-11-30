import React from 'react'

export const CardGananciaT = ({envios}) => {
  return (
    <div className='overflow-y-auto  pb-12  '>

    <table className="sm:table-fixed table-auto lg:text-lg text-sm  w-full border-collapse border border-slate-400">
    <thead>
      <tr>
        <th className='border border-slate-300'>Fecha Compra</th>
        <th className='border border-slate-300'>Precio</th>
        <th className='border border-slate-300'>Referencia Compra</th>
      </tr>
    </thead>
    <tbody className="text-center overflow-y sm:max-h-12">
      {
        envios.length > 0  ?
        envios.map(
          ({
            REFERENCIA_COMPRA,
            FECHA_COMPRA,
            PRECIOT
          }) => (
            <tr key={REFERENCIA_COMPRA}>
              <td className='border border-slate-300'>{FECHA_COMPRA}</td>
              <td className='border border-slate-300'>{
                 Number(PRECIOT).toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })
              }</td>
              <td className='border border-slate-300' >#{REFERENCIA_COMPRA}</td>
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
