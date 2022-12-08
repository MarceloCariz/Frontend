
import { ErrorMessage, useField } from "formik"



export const MySelect = ({label, ...props}) => {

    const [field] = useField(props);

    return (
        <div className="flex flex-col ">
            <label className="text-left  font-semibold text-lg" htmlFor={props.id || props.name}>{label}</label>
            <select  className="w-full h-12 shadow-md" {...field} {...props} />
            <ErrorMessage className="text-red-500 font-semibold" name={props.name} component="span"/>

        </div>
    )
}