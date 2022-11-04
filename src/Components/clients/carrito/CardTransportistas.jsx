import React from 'react'

export const CardTransportistas = ({transportistas, setFormValues, formValues,total}) => {

    const onChange = ({target}) =>{
        const index  = target.options.selectedIndex;
        const id = target.childNodes[index].id;
        
        const numero = Number(target.value);
        console.log(isNaN(numero))
        const precio = isNaN(numero) ? 0 :numero
        setFormValues({...formValues,id_transportista: id, precioT: precio});
    }
  return (
    <div  style={{marginBottom: 20}} className="flex justify-center flex-col gap-4">
        <h3 className='text-xl font-semibold'>Selecciona a un Transportista</h3>
        <select defaultValue="seleccione" onChange={onChange}>
            <option value="seleccione" disabled>---SELECCIONE---</option>
            {transportistas.map(({NOMBRE, ID, PRECIO})=>(
                <option   key={ID} id={ID} value={PRECIO}>{NOMBRE}</option>
            ))}
        </select>
        <p>Precio del transporte: {(formValues.precioT)}</p>
        <p className="text-left">Precio total Productos: {(total).toLocaleString("es-CL", {style: "currency", currency:"CLP"})}</p>
        
    </div>
  )
}
