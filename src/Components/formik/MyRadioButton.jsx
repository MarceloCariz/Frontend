import { ErrorMessage, useField } from "formik"



export const MyRadioButton = ({label, ...props}) => {

    const [field] = useField(props); /// con meta se puede agregar estilos con los errores que proporciona el meta

    return (
        <div className="flex items-center gap-4">
            <label htmlFor={props.id || props.name}>{label}</label>
            <input type={"radio"} className="h-12" {...field} {...props} />
            <ErrorMessage className="text-red-500 font-semibold" name={props.name} component="span"/>
        </div>
    )
}