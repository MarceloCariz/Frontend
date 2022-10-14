import React, { useState } from 'react'

export const CardTransportistas = ({transportistas, setFormValues, formValues,}) => {

    const onChange = ({target}) =>{
        const index  = target.options.selectedIndex;
        const id = target.childNodes[index].id;
        
        const numero = Number(target.value);
        console.log(isNaN(numero))
        const precio = isNaN(numero) ? 0 :numero
        setFormValues({...formValues,id_transportista: id, precioT: precio});
    }
  return (
    <div  style={{marginBottom: 12}}>
        <h3>Seleccionar Transportista</h3>
        <select defaultValue="seleccione" onChange={onChange}>
            <option value="seleccione" disabled>---SELECCIONE---</option>
            {transportistas.map(({NOMBRE, ID, PRECIO})=>(
                <option   key={ID} id={ID} value={PRECIO}>{NOMBRE}</option>
            ))}
        </select>
        <p>Precio del transporte: {formValues.precioT}</p>
    </div>
  )
}
