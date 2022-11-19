import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const TituloLogin = ({acceso}) => {
  return (
    <h2 className="flex  justify-center gap-2  text-3xl w-full items-center  text-center  ">
    <FontAwesomeIcon className='font-bold animate-pulse' icon={faSeedling }/>
    Maipo Grande <span className='absolute mt-12 lg:ml-48 md:ml-36 ml-32 text-sm'>Acceso {acceso}</span>
    </h2>
  )
}
