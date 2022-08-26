import React, { useEffect, useState } from 'react'
import { actualizarDatos, traerDatos } from '../Helpers/getClientes';
import useAuth from '../Hooks/useAuth'

const Perfil = () => {
    const {auth, config} = useAuth();
    const {CORREO, NOMBRE} =auth;
    const [informacion, setInformacion] = useState({})
    const [formValues, setFormValues] = useState(
        {
            direccion: '',
            ciudad: '',
            pais: '',
        }
    )

    useEffect(() => {
        const cargarDatos = async() =>{
            const resp = await traerDatos(config);
            setFormValues({
                direccion: resp.DIRECCION || '',
                ciudad: resp.CIUDAD || '',
                pais: resp.PAIS || ''
            })
        } 

        cargarDatos();
    }, [])

    const handleInputchange = ({target})=>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
        console.log(formValues)
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(formValues)
        const resp = await actualizarDatos(formValues, config);
        console.log(resp)
    }
  return (
    <div className='flex flex-col justify-center items-center pt-4'>
        <h2 className='text-2xl mb-8 font-bold'>Informacion Personal</h2>
        <form onSubmit={handleSubmit} className='bg-white shadow-lg px-12 py-4 flex flex-col '> 
        {/* 4 */}
            <div className='flex gap-6 items-center'>
                <label htmlFor="correo" className='text-xl font-bold'>Nombre :</label>
                <p className='bg-gray-100 px-2'>{NOMBRE}</p>
            </div>
            <div className='flex gap-9 items-center'>
                <label htmlFor="correo" className='text-xl font-bold'>Correo :</label>
                <p className='bg-gray-100 px-2'>{CORREO}</p>
            </div>
            <div className='flex gap-3 items-center'>
                <label htmlFor="correo" className='text-xl font-bold'>Direccion :</label>
                <input name='direccion' onChange={handleInputchange} className='bg-gray-100 px-2' value={formValues.direccion}/>
            </div>
            <div className='flex gap-10 items-center'>
                <label htmlFor="correo" className='text-xl font-bold'>Ciudad:</label>
                <input name='ciudad' onChange={handleInputchange}  className='bg-gray-100 px-2' value={formValues.ciudad}/>
            </div>
            <div className='flex gap-1 items-center'>
                <label htmlFor="correo" className='text-xl font-bold'>Pais:</label>
                <input name='pais' onChange={handleInputchange}  className='ml-16 bg-gray-100 px-2' value={formValues.pais}/>
            </div>
            <button type="submit" className='text-white bg-blue-500 px-4 py-2 mt-2 w-1/2 ml-24'>Actualizar</button>
        </form>
    </div>
  )
}

export default Perfil