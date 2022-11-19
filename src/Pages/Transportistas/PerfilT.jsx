
import React, { useEffect, useState } from 'react';
import { Contrato } from '../../Components/productores/Contrato';
import { Ganancias } from '../../Components/productores/Ganancias';
import {traerDatos, perfilTransportista, obtenerContrato, obtenerEnviosCompletados} from '../../Helpers/getTransportista';
import useAuth from '../../Hooks/useAuth';

const PerfilT = () => {
    const {auth, config} = useAuth();
    const [contrato, setContrato] = useState({});
    const [cargando, setCargando] = useState(false);
    const [envios, setEnvios] = useState([])
    const {CORREO, NOMBRE} = auth;
    const [formValues, setFormValues] = useState(
        {
            tamano: '',
            capacidad: '',
            carga: '',
            refrigeracion: '',
            precio : ''
        }
    );
    const [activeActualizarT, setActiveActualizarT] = useState(false)
    const [mensaje, setMensaje] = useState('');


    useEffect(() => {
        const cargarDatos = async() =>{
            setCargando(true)

            const resp = await traerDatos(config);
            setFormValues({
                tamano: resp.TAMANO || '',
                capacidad: resp.CAPACIDAD || '',
                carga: resp.CARGA || '',
                refrigeracion: resp.REFRIGERACION || '',
                precio: resp.PRECIO || ''
            })
            const contratoR = await obtenerContrato(config);
            setContrato(contratoR);
            const enviosR = await obtenerEnviosCompletados(config);
            setEnvios(enviosR);
            setCargando(false)

        } 
        cargarDatos();
    }, [config])

    const handleInputchange = ({target})=>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
        setActiveActualizarT(true)
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const resp = await perfilTransportista(formValues, config);
        setMensaje(resp.msg);
        setActiveActualizarT(false)
        setTimeout(() => {
            setMensaje('')
        }, 2000);

    }
    const {SUELDO} = contrato;
    const ganancia = Number(SUELDO).toLocaleString("es-CL", {style: "currency", currency:"CLP"})
  return (
    <div className='flex flex-col gap-4 justify-center items-center pt-4 mb-12  mx-auto '>
        <div className='flex 2xl:flex-row gap-4 flex-col 2xl:justify-center 2xl:items-start items-center 2xl:gap-2 mb-2'>
                <Ganancias ganancia={ganancia} envios={envios}  sueldo={SUELDO} cargando={cargando} rol="transportista"/>

                <Contrato contrato={contrato}/>
        </div>


        { mensaje ? <p className='bg-green-500 py-2 px-4 text-white font-semibold mb-2 w-1/4 text-center'>{mensaje}</p> : ''}
        <form onSubmit={handleSubmit} className='bg-white shadow-lg px-12 py-4 flex flex-col sm:w-auto w-6/7 gap-4 '> 
        {/* 4 */}
            <h2 className='text-2xl mb-8 font-bold text-center'>Información Personal</h2>

            <div className='flex gap-6 items-center'>
                <label htmlFor="nombre" className='sm:text-xl font-bold'>Nombre :</label>
                <p className='bg-gray-100 px-2 h-8'>{NOMBRE}</p>
            </div>
            <div className='flex gap-9 items-center w-32'>
                <label htmlFor="correo" className='sm:text-xl   font-bold '>Correo:   </label>
                <p className='bg-gray-100 px-1 text-sm h-8'>{CORREO}</p>
            </div>
            <div className='flex gap-3 items-center w-full'>
                <label htmlFor="tamano" className='sm:text-xl font-bold'>Tamaño :</label>
                <input name='tamano' onChange={handleInputchange} className='bg-white rounded-lg px-2 h-8 border ' value={formValues.tamano}/>
            </div>
            <div className='flex gap-2 items-center w-full'>
                <label htmlFor="capacidad" className='sm:text-xl font-bold'>Capacidad :</label>
                <input name='capacidad' onChange={handleInputchange} className='bg-white rounded-lg px-2 h-8 border sm:w-auto w-2/3' value={formValues.capacidad}/>
            </div>
            <div className='flex gap-2 items-center'>
                <label htmlFor="carga" className='sm:text-xl font-bold'>Carga :</label>
                <input name='carga' onChange={handleInputchange}  className='bg-white rounded-lg px-2 h-8 border sm:w-auto w-2/3' value={formValues.carga}/>
            </div>
            {/* <div className='flex gap-10 items-center'>
                <label htmlFor="refrigeracion" className='sm:text-xl font-bold'>Refrigeracion :</label>
                <input name='refrigeracion' onChange={handleInputchange}  className='bg-gray-100 px-2' value={formValues.refrigeracion}/>
            </div> */}

            <div>
                <div className='sm:text-xl font-bold'>Indique Tipo de refrigeración</div>
                    <div className='flex justify-center text-sm gap-8' >
                        <div className='flex items-center gap-2 text-lg'>
                            <p>Thermal Master</p>
                        <input name='refrigeracion' type="radio" value="Thermal-Master"  onChange={handleInputchange} checked={formValues.refrigeracion === "Thermal-Master"}/>
                        </div>
                    <div className='flex items-center gap-2 text-lg'>
                            <p>ACT</p>
                         <input name='refrigeracion' type="radio" value="ACT" onChange={handleInputchange}  checked={formValues.refrigeracion === "ACT" }/>
                     </div>
                     </div>
            </div>

            <div className='flex gap-2 items-center'>
                <label htmlFor="precio" className='sm:text-xl font-bold'>Precio :</label>
                <input id="precio" name='precio' onChange={handleInputchange}  className='bg-gray-100 px-2 bg-white rounded-lg px-2 h-8 border sm:w-auto w-2/3' value={formValues.precio}/>
            </div>

            <div className='flex justify-center'>
                <button type="submit" className={ activeActualizarT ? 'text-white bg-green-500 px-4 py-2 mt-2 w-auto '  : 'text-white bg-blue-500 px-4 py-2 mt-2 w-1/2 '}>
                {activeActualizarT ? "Guardar Cambios" : "Actualizar"}</button>
            </div>
        </form>

    </div>
  )
}

export default PerfilT