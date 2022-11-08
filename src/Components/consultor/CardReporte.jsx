import React, { useState } from 'react'

export const CardReporte = ({ID_REPORTE, AUTOR, DESCRIPCION, FECHA}) => {
  const [show, setShow] = useState(false)
  const active = "flex h-auto flex-col gap-2 bg-white px-4 py-2 sm:w-1/4 w-auto sm:text-base text-sm rounded-md shadow-xl";
  const inactive = "flex h-fit flex-col gap-2 bg-white px-4 py-2 sm:w-1/4 w-40 sm:text-base text-sm  rounded-md shadow-xl";
  return (
    <div key={ID_REPORTE} className={show ? active : inactive} >
        <p>Reporte n°{ID_REPORTE}</p>
        <p>Autor: {AUTOR}</p>
        <p>Fecha del reporte: {FECHA}</p>
        <button onClick={()=>setShow(!show)} className='px-4 py-2 bg-blue-500 text-white'>{show ? "Ocultar descripción" : "Ver descripción"}</button>
        {show && (
            <p className=' flex flex-col whitespace-pre-line text-justify'>Descripción: <span className=' '>{DESCRIPCION}</span></p>
        )}
        
  </div>
  )
}
