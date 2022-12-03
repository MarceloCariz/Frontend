import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export const CardReporte = ({ID_REPORTE, AUTOR, FECHA, TIPO_REPORTE, PDF_PATH}) => {
    
    // const styles = "flex h-auto flex-col gap-2 bg-white px-4 py-2 md:w-1/3 xl w-auto sm:text-base text-sm rounded-md shadow-xl";
    const styles = "flex h-fit flex-col gap-2 bg-white px-4 py-2  md:w-full xl:w-auto sm:text-base text-sm  rounded-md shadow-xl";
    const onButtonClick = () => {
                    fetch(PDF_PATH).then(response => {
                    response.blob().then(blob => {
                        const fileURL = window.URL.createObjectURL(blob);
                        let alink = document.createElement('a');
                        alink.href = fileURL;
                        alink.download = `reporte_${TIPO_REPORTE.toLowerCase() + "_" + FECHA}.pdf`;
                        alink.click();
                    })
                })
    }
return (
    <div key={ID_REPORTE}  className={styles}>
        <p>Reporte n°{ID_REPORTE}</p>
        <p>Autor: {AUTOR}</p>
        <p>Fecha del reporte: {FECHA}</p>
        <p className='flex flex-col '>Tipo de Reporte: <span className='font-black'>{TIPO_REPORTE}</span> </p>


        <button onClick={onButtonClick}>
            <a className='bg-purple-600  h-12 text-center flex items-center justify-center gap-1 text-white   rounded w-full'>
                <FontAwesomeIcon icon={faDownload}/>
                Descargar PDF
            </a>
        </button>
        {/* {show && (
            // <p className=' flex flex-col whitespace-pre-line text-justify'>Descripción: <span className=' '>{DESCRIPCION}</span></p>
            <ModalReporte ID={ID_REPORTE} setShow={setShow} descripcion={DESCRIPCION} tipo={TIPO_REPORTE}/>
        )}
         */}
        
  </div>
  )
}
