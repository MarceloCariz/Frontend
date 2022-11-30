
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import { perfilTransportista, traerDatos } from '../../Helpers/getTransportista';
import { MyRadioButton } from '../formik/MyRadioButton';
import { MyTextInput } from '../formik/MyTextInput'

// tamano: '',
// capacidad: '',
// carga: '',
// refrigeracion: '',
// precio : ''

export const Formulario = ({auth, config}) => {
    const [formValues, setFormValues] = useState({});
    const [mensaje, setMensaje] = useState('');

    const cargarDatos = async() =>{
        const resp = await traerDatos(config);
        setFormValues({...resp, nombre: auth.NOMBRE, correo: auth.CORREO})
    } 

    
    useEffect(() => {

        cargarDatos();
    }, []);

    // console.log(formValues)
    const actualizarInfo = async(values) =>{
        const newObj = Object.fromEntries(
            Object.entries(values).map(([k, v]) => [k.toLowerCase(), v])
        );

        const resp = await perfilTransportista(newObj, config);
        setMensaje(resp.msg);
        cargarDatos();
        setTimeout(() => {
            setMensaje('')
        }, 2000);
    }

    
    return (
        <Formik
            initialValues={ 
                formValues && formValues
            }
            enableReinitialize={true}
            onSubmit={(values)=> actualizarInfo(values)}
            validationSchema={
                Yup.object({
                    CAPACIDAD: Yup.number().min(1,"El valor debe ser mayor a 1").max(100000,"El valor no debe ser mayor a 100.000 kg").required("Este campo es obligatorio"),
                    CARGA:Yup.number().min(1,"El valor debe ser mayor a 1").max(100000,"El valor no debe ser mayor a 100.000 kg").required("Este campo es obligatorio"),
                    PRECIO: Yup.number().min(1,"El valor debe ser mayor a 1").max(100000,"El valor no debe ser mayor a 100.000").required("Este campo es obligatorio"),
                    REFRIGERACION: Yup.string().oneOf(["ACT","Thermal-Master"]).required("Este campo es obligatorio"),
                    TAMANO:Yup.number().min(1,"El valor debe ser mayor a 1").max(100000,"El valor no debe ser mayor a 100.000 kg").required("Este campo es obligatorio"),
                })

            }
        >
            {
                ({values})=> (
                    <Form  className='bg-white shadow-lg px-12 py-4 flex flex-col sm:w-1/3 w-6/7 gap-4 '>
                        { mensaje ? <p className='bg-green-500 py-2 px-4 text-white font-semibold mb-2 text-center'>{mensaje}</p> : ''}
                        <h3 className='text-2xl mb-2 font-bold text-center'>Información Personal</h3>
                        <div className='grid grif-cols-2 gap-6'>
                            <MyTextInput  label="Nombre" disabled name="nombre"/>
                        </div>
                        <div className='grid grif-cols-2 gap-6'>
                            <MyTextInput label="Correo" disabled name="correo"/>
                        </div>
                        <div className='grid grif-cols-2 gap-6'>
                            <MyTextInput label="Capacidad" type="number"  name="CAPACIDAD" />
                        </div>
                        <div className='grid grif-cols-2 gap-6'>
                            <MyTextInput label="Tamaño " type="number"  name="TAMANO" />
                        </div>
                        <div className='grid grif-cols-2 gap-6'>
                            <MyTextInput label="Carga" type="number"  name="CARGA" />
                        </div>
                        <label htmlFor="" className='font-semibold text-lg'>Tipo de refrigeracion</label>
                        <div className='flex gap-12'>
                            <MyRadioButton name="REFRIGERACION" checked={values.REFRIGERACION === "Thermal-Master"} label={"Thermal-Master"} value="Thermal-Master"/>
                            <MyRadioButton name="REFRIGERACION" checked={values.REFRIGERACION === "ACT"} label={"ACT"} value="ACT"/>
                        </div>


                        <MyTextInput label="Precio " type="number"  name="PRECIO" />
                        <div className='flex justify-center'>
                            <button type="submit" className={ `text-white  px-4 py-2 mt-2 w-1/2  rounded-md h-16 ${mensaje ? 'bg-green-500' : 'bg-blue-500' } ` }>
                            {mensaje ? mensaje : "Actualizar"}</button>
                        </div>
                    </Form>
                )
            }
        </Formik>
    )
}
