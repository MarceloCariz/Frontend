import { ErrorMessage, useField } from "formik"



export const MyTextInput = ({label, ...props}) => {

    const [field] = useField(props); /// con meta se puede agregar estilos con los errores que proporciona el meta

    return (
        <>
            <label className="text-left  font-semibold text-lg" htmlFor={props.id || props.name}>{label}</label>
            <input className="h-12 border  rounded-md pl-2" {...field} {...props} />
            <ErrorMessage className="text-red-500 font-semibold" name={props.name} component="span"/>
        </>
    )
}