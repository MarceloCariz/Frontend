import clienteAxios from "../config/clienteAxios"


export const login = async(datos) =>{
        const {data} = await clienteAxios.post('/usuario/login',{...datos, rol: "transportista"});
        return data
  
}