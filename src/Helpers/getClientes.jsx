import clienteAxios from "../config/clienteAxios"


export const login = async(datos) =>{
    
        const {data} =  await clienteAxios.post('/clientes/login',datos)
        return data
}


export const registrar = async(datos) =>{
    console.log(datos)
    const {data} = await clienteAxios.post('/clientes/nuevo',datos)
    console.log(data)
}