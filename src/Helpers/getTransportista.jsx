import clienteAxios from "../config/clienteAxios"


export const login = async(datos) =>{
        const {data} = await clienteAxios.post('/usuario/login',{...datos, rol: "transportista"});
        return data
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