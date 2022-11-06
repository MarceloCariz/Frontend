import React from 'react'
import { Link, useParams } from 'react-router-dom';
import Productos from '../Components/clients/Productos';
import { Spinnner } from '../Components/ui/Spinnner';
import useAuth from '../Hooks/useAuth';
import useConsultas from '../Hooks/useConsultas';

export const Resultado = () => {
  const {auth} = useAuth();
  const {productos, cargando} = useConsultas();
  const {nombre} = useParams();
  return (
    <div className='mx-auto container'>
        <h2 className='text-2xl font-semibold'>Resultado de busqueda :</h2>
    {cargando && productos.length === 0 && <Spinnner/>}
        {productos.length > 0 ? 
        <Productos productos={productos} tipo={auth.TIPO_CLIENTE}/>
        : !cargando && 
        (<div className='flex flex-col items-center gap-2'>
            <p className='text-center  mt-20 text-3xl font-semibold'>No hay productos con el nombre "{nombre}"</p>
            <Link  className="px-4 py-2 text-white bg-slate-600 text-lg w-40 text-center " to={'/inicio'}>
                Volver al Inicio
            </Link>
        </div>)
    }
    </div>
    )
}
