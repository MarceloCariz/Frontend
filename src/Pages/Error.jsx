// import React from 'react'
import { Link } from 'react-router-dom'
import './styles/error.css'

export const Error = () => {
return (
    <div id='oopss'>
    <div id='error-text'>
        <span>404</span>
        <p>PAGINA NO ENCONTRADA</p>
        <Link to={"/"} className=' back mt-12 '>Volver al inicio</Link>
    </div>
    </div>
)
}
