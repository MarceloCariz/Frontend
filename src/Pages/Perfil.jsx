import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { actualizarDatos } from '../Helpers/getClientes';
import useAuth from '../Hooks/useAuth'
import useConsultas from '../Hooks/useConsultas';

const Perfil = () => {
    const {auth, config} = useAuth();
    const {cargarDatos, formValues, setFormValues} = useConsultas();
    const {CORREO, NOMBRE, RUT} =auth;

    // const [formValues, setFormValues] = useState(
    //     {
    //         direccion: '',
    //         ciudad: '',
    //         pais: '',
    //     }
    // );
    const [activeActualizar, setActiveActualizar] = useState(false)
    const [mensaje, setMensaje] = useState('');
    const location = useLocation();

    useEffect(() => {
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
        <h2 className='text-2xl mb-8 font-bold'>Información Personal</h2>
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
            {auth.TIPO_CLIENTE === 'local' && (
                           <div className='flex gap-9 items-center w-32'>
                           <label htmlFor="correo" className='sm:text-xl  text-sm font-bold'>Rut:   </label>
                           <p className='bg-gray-100 px-2 text-sm '>{RUT}</p>
                       </div>
            )}

            <div className='flex gap-3 items-center'>
                <label htmlFor="direccion" className='sm:text-xl font-bold'>Dirección :</label>
                <input name='direccion' onChange={handleInputchange} className='bg-gray-100 px-2 ' value={formValues.direccion}/>
            </div>
            <div className='flex gap-10 items-center'>
                <label htmlFor="ciudad" className='sm:text-xl font-bold'>Ciudad:</label>
                <input name='ciudad' onChange={handleInputchange}  className='bg-gray-100 px-2' value={formValues.ciudad}/>
            </div>
            {auth.TIPO_CLIENTE === 'externo' && (
                <div className='flex gap-1 items-center'>
                    <label htmlFor="pais" className='sm:text-xl font-bold'>País:</label>
                    <input name='pais' onChange={handleInputchange}  className='ml-16 bg-gray-100 px-2' value={formValues.pais}/>
                </div>
            )}
            <div className='flex justify-center'>
                <button type="submit" className={ activeActualizar ? 'text-white bg-green-500 px-4 py-2 mt-2 w-auto '  : 'text-white bg-blue-500 px-4 py-2 mt-2 w-1/2 '}>
                {activeActualizar ? "Guardar Cambios" : "Actualizar"}</button>
            </div>
        </form>
        {
            location.state === '/inicio/carrito' &&
            (<Link to={'/inicio/carrito'} className="bg-green-500 flex items-center gap-2 px-4 py-2 mt-2 text-white font-semibold"> 
            <FontAwesomeIcon icon={faCircleChevronLeft}/>
            Volver al Carrito</Link>)
        }
    </div>
  )
}

export default Perfil