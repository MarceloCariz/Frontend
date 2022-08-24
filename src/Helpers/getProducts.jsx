import clienteAxios from "../config/clienteAxios"



export const obtenerProductos = async()=>{
    try {
       const {data} = await clienteAxios('/productos')
       return data
    } catch (error) {
        console.log(error)
    }
}

