import React, { useEffect, useState } from 'react'
import { actualizarDatos, traerDatos } from '../Helpers/getClientes';
import useAuth from '../Hooks/useAuth'

const Perfil = () => {
    const {auth, config} = useAuth();
    const {CORREO, NOMBRE} =auth;
    const [formValues, setFormValues] = useState(
        {
            direccion: '',
            ciudad: '',
            pais: '',
        }
    );
    const [activeActualizar, setActiveActualizar] = useState(false)
    const [mensaje, setMensaje] = useState('')

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
    }, [config])

    const handleInputchange = ({target})=>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
        setActiveActualizar(true)
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const resp = await actualizarDatos(formValues, config);
        setMensaje(resp.msg);
        setActiveActualizar(false)
        setTimeout(() => {
            setMensaje('')
        }, 2000);

    }
  return (
    <div className='flex flex-col justify-center items-center pt-4 mb-56 '>
        <h2 className='text-2xl mb-8 font-bold'>Informacion Personal</h2>
        { mensaje ? <p className='bg-green-500 py-2 px-4 text-white font-semibold mb-2 w-1/4 text-center'>{mensaje}</p> : ''}
        <form onSubmit={handleSubmit} className='bg-white shadow-lg px-12 py-4 flex flex-col sm:w-auto w-6/7 gap-4 '> 
        {/* 4 */}
            <div className='flex gap-6 items-center'>
                <label htmlFor="correo" className='sm:text-xl font-bold'>Nombre :</label>
                <p className='bg-gray-100 px-2'>{NOMBRE}</p>
            </div>
            <div className='flex gap-9 items-center w-32'>
                <label htmlFor="correo" className='sm:text-xl  text-sm font-bold'>Correo:   </label>
                <p className='bg-gray-100 px-2 text-sm '>{CORREO}</p>
            </div>
            <div className='flex gap-3 items-center'>
                <label htmlFor="correo" className='sm:text-xl font-bold'>Direccion :</label>
                <input name='direccion' onChange={handleInputchange} className='bg-gray-100 px-2 ' value={formValues.direccion}/>
            </div>
            <div className='flex gap-10 items-center'>
                <label htmlFor="correo" className='sm:text-xl font-bold'>Ciudad:</label>
                <input name='ciudad' onChange={handleInputchange}  className='bg-gray-100 px-2' value={formValues.ciudad}/>
            </div>
            <div className='flex gap-1 items-center'>
                <label htmlFor="correo" className='sm:text-xl font-bold'>Pais:</label>
                <input name='pais' onChange={handleInputchange}  className='ml-16 bg-gray-100 px-2' value={formValues.pais}/>
            </div>
            <button type="submit" className={ activeActualizar ? 'text-white bg-green-500 px-4 py-2 mt-2 w-auto '  : 'text-white bg-blue-500 px-4 py-2 mt-2 w-1/2 ml-24'}>
               {activeActualizar ? "Guardar Cambios" : "Actualizar"}</button>
        </form>
    </div>
  )
}

export default Perfil