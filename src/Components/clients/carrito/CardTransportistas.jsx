import React from 'react'

export const CardTransportistas = ({transportistas, setFormValues, formValues}) => {
    const onChange = ({target}) =>{
        setFormValues({...formValues,id_transportista: target.value})
    }
  return (
    <div  style={{marginBottom: 12}}>
        <h3>Seleccionar Transportista</h3>
        <select defaultValue="seleccione" onChange={onChange}>
            <option value="seleccione" disabled>---SELECCIONE---</option>
            {transportistas.map(({NOMBRE, ID})=>(
                <option   key={ID} value={ID}>{NOMBRE}</option>
            ))}
        </select>
    </div>
  )
}
