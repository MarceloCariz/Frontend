import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { ModalReporte } from './ModalReporte';

export const CardReporte = ({ID_REPORTE, AUTOR, DESCRIPCION, FECHA, TIPO_REPORTE, PDF_PATH}) => {
  const [show, setShow] = useState(false)
  const active = "flex h-auto flex-col gap-2 bg-white px-4 py-2  w-auto sm:text-base text-sm rounded-md shadow-xl";
  const inactive = "flex h-fit flex-col gap-2 bg-white px-4 py-2  w-auto sm:text-base text-sm  rounded-md shadow-xl";
  return (
    <div key={ID_REPORTE} className={show ? active : inactive} >
        <p>Reporte n°{ID_REPORTE}</p>
        <p>Autor: {AUTOR}</p>
        <p>Fecha del reporte: {FECHA}</p>
        <p className='flex flex-col '>Tipo de Reporte: <span className='font-black'>{TIPO_REPORTE}</span> </p>

        <button onClick={()=>setShow(!show)} className='px-4 py-2 bg-blue-500 text-white'>{show ? "Ocultar descripción" : "Ver descripción"}</button>
        <a className='bg-purple-600 text-center flex items-center justify-center gap-1 text-white   rounded w-full' href={PDF_PATH} target="_blank" download={PDF_PATH}>
            <FontAwesomeIcon icon={faDownload}/>
            Descargar PDF
        </a>
        {show && (
            // <p className=' flex flex-col whitespace-pre-line text-justify'>Descripción: <span className=' '>{DESCRIPCION}</span></p>
            <ModalReporte ID={ID_REPORTE} setShow={setShow} descripcion={DESCRIPCION} tipo={TIPO_REPORTE}/>
        )}
        
        
  </div>
  )
}
