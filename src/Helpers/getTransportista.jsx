import clienteAxios from "../config/clienteAxios"


export const login = async(datos) =>{

        const {data} =  await clienteAxios.post('/usuario/login',{...datos, rol: "transportista"});
        return data
  
}

export const traerDatos = async(config)=>{
        const {data} = await clienteAxios('/transportista/informacion', config);
        return data
    }
    
    export const perfilTransportista = async(datos,config)=>{
        try {
                console.log(datos)
                const {data} = await clienteAxios.put('/transportista/informacion/actualizar',datos, config);
                return data
        } catch (error) {
            console.log(error)    
        }

    }