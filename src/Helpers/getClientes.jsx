import clienteAxios from "../config/clienteAxios"


export const login = async(datos) =>{
    
        const {data} =  await clienteAxios.post('/clientes/login',datos)
        return data
  
     
    //  return data;
        
    
}