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


export const obtenerSubastas = async() =>{
        try {
                const {data} = await clienteAxios.get('/transportista/subastas');
                return data;
        } catch (error) {
                console.log(error)
        }
}

export const obtenerPerfil  = async(config) =>{
        try {
                const {data} = await clienteAxios.get('/transportista/perfil', config)
                return data
        } catch (error) {
                console.log(error)
        }
}


export const obtenerEnvios = async(config) =>{
        try {
            const {data} = await clienteAxios('/transportista/envios', config);
            const obj = data.reduce((acc, product)=>{
                if(!acc[product.REFERENCIA_COMPRA]){
                    acc[product.REFERENCIA_COMPRA] = []
                }
                // console.log(product)
                acc[product.REFERENCIA_COMPRA].push(product)
    
                return acc
              },[]);
             
    
            return obj
        } catch (error) {
            console.log(error)
        }
    }

export const confirmarEnvioEnviado = async(referencia_compra, config) =>{
        // referencia_compra = (referencia_compra.toString());
        // console.log(referencia_compra)
        console.log(config)
        try {
            const {data} =await  clienteAxios.put(`/transportista/envios/enviado/confirmar`, {referencia_compra},config);
            return data;
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }
