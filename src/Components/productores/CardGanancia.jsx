import React from 'react'

export const CardGanancia = ({envios}) => {
  return (
    <div className='overflow-y-auto sm:max-h-72 h-52 '>
      <table className="sm:table-fixed table-auto sm:text-lg text-sm  sm:w-full border-collapse border border-slate-400 ">
      <thead>
        <tr>
          <th className='border border-slate-300'>ID</th>
          <th className='border border-slate-300'>NOMBRE</th>
          <th className='border border-slate-300'>CANTIDAD</th>
          <th className='border border-slate-300'>PRECIO</th>
          <th className='border border-slate-300'>PRECIO TOTAL</th>
          <th className='border border-slate-300'>ID COMPRA</th>
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
                <td className='border border-slate-300'>{ID_PRODUCTO}</td>
                <td className='border border-slate-300'>{NOMBRE_PRODUCTO}</td>
                <td className='border border-slate-300'>{CANTIDAD}</td>
                <td className='border border-slate-300'>
                  {Number(PRECIO).toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </td>
                <td className='border border-slate-300'> 
                  {(PRECIO * Number(CANTIDAD)).toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </td>
                <td className='border border-slate-300'>#{REFERENCIA_COMPRA}</td>
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
