import clienteAxios from "../config/clienteAxios"
const token = localStorage.getItem('token')

const config = {
    headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
}
export const login = async(datos) =>{

    const {data} =  await clienteAxios.post('/usuario/login',{...datos, rol: "productor"})
    return data
}


export const obtenerProductos = async() =>{
    const {data} = await clienteAxios.get('/productores/productos', config);
    return data;
}