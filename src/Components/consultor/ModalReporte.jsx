import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const ModalReporte = ({descripcion,setShow, ID, tipo}) => {

  return (
    <div className='absolute 2xl:w-1/4 lg:w-2/4 md:w-3/5 w-5/6 h-auto top-32 sm:top-40 text-center px-4 py-4 bg-white border-1 border border-gray-500 rounded-xl right-0 left-0 mr-auto ml-auto'>
        <button onClick={() => setShow(false)} className="bg-red-500 sm:w-auto w-16 text-sm absolute top-1 left-1 rounded-md  px-2 py-1 text-white ">
            <FontAwesomeIcon className="sm:mr-1 " icon={faClose}/>
            Cerrar
        </button>
        <div className='flex flex-col items-center gap-5'>
            <h3 className='mt-6 font-semibold'>Descripción del Reporte #{ID}</h3>
            <h4 className='font-semibold text-sm'>{tipo}</h4>
            <p className='whitespace-pre-line text-justify'>{descripcion}</p>
        </div>

    </div>
  )
}
