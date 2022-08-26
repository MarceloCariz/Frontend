import clienteAxios from "../config/clienteAxios"


export const login = async(datos) =>{

        const {data} =  await clienteAxios.post('/usuario/login',{...datos, rol: "cliente"})
        return data
}


export const registrar = async(datos) =>{
    console.log(datos)
    const {data} = await clienteAxios.post('/clientes/nuevo',{...datos, tipo: 'Local'})
    console.log(data)
}

export const traerDatos = async(config)=>{
    const {data} = await clienteAxios('/clientes/informacion', config);
    return data
}

export const actualizarDatos = async(datos,config)=>{
    const {data} = await clienteAxios.put('/clientes/informacion/actualizar',datos, config);
    return data
}