import React, { useState } from 'react'

export const CardReporte = ({ID_REPORTE, AUTOR, DESCRIPCION, FECHA}) => {
  const [show, setShow] = useState(false)

  return (
    <div key={ID_REPORTE} className="flex flex-col gap-2 bg-white px-4 py-2 w-1/4  rounded-md" >
        <p>Reporte n°{ID_REPORTE}</p>
        <p>Autor: {AUTOR}</p>
        <p>Fecha del reporte: {FECHA}</p>
        <button onClick={()=>setShow(!show)} className='px-4 py-2 bg-blue-500 text-white'>{show ? "Ocultar descripcion" : "Ver descripcion"}</button>
        {show && (
            <p className=' flex flex-col whitespace-pre-line text-justify'>Descripcion: <span className=' '>{DESCRIPCION}</span></p>
        )}
        
  </div>
  )
}
