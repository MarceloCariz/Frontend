import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { actualizarDatos, traerDatos } from '../Helpers/getClientes';
import useAuth from '../Hooks/useAuth'

const Perfil = () => {
    const  transt = [{id:1, carga:3 , precio: 1580},{id:2, carga:4 , precio: 1600}];
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
    const [mensaje, setMensaje] = useState('');
    const location = useLocation();

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
        const cantidad = 3;
        const seleccionado = [];
        for(const t in transt){
            console.log(transt[t].carga);
            if(transt[t].carga >= cantidad){
                seleccionado.push(transt[t]);
            }
        }
        console.log(seleccionado)
        const precio = seleccionado.sort((a, b) => a.precio - b.precio);
        console.log(precio[0]);

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
                <label htmlFor="direccion" className='sm:text-xl font-bold'>Direccion :</label>
                <input name='direccion' onChange={handleInputchange} className='bg-gray-100 px-2 ' value={formValues.direccion}/>
            </div>
            <div className='flex gap-10 items-center'>
                <label htmlFor="ciudad" className='sm:text-xl font-bold'>Ciudad:</label>
                <input name='ciudad' onChange={handleInputchange}  className='bg-gray-100 px-2' value={formValues.ciudad}/>
            </div>
            {auth.TIPO_CLIENTE === 'externo' && (
                <div className='flex gap-1 items-center'>
                    <label htmlFor="pais" className='sm:text-xl font-bold'>Pais:</label>
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