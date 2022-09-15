import React from 'react'

const CardBienvenido = () => {
  return (
    <div style={{backgroundColor: '#212121'}} className="hidden rounded-l-lg px-20 sm:flex flex-col items-center  text-white justify-center">
      <div className='flex flex-col '>
        <h1 className="text-3xl font-semibold mb-8">¡Bienvenido a Maipo Grande!</h1>
        <p className='w-72 text-left font-light text-lg'>Bienvenido a la feria virtual donde encontraras todos los productos que deseas.</p>
      </div>

  </div>
  )
}

export default CardBienvenido