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


export const obtenerProductos = async(configt) =>{

    const {data} = await clienteAxios.get('/productores/productos', configt);
    return data;
}

export const actualizarProducto = async (producto, configt) =>{
    console.log(producto)
    try {
        const {data} = await clienteAxios.put('/productores/productos/editar', producto,configt)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const eliminarProducto = async(id, configt) =>{
    try {
        const {data} = await clienteAxios.delete(`/productores/productos/eliminar/${id}`, configt)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const agregarProducto = async(producto, configt) =>{
    try {
        const {data} = await clienteAxios.post('/productores/productos/nuevo', producto, configt)
        return data
    } catch (error) {
        console.log(error)
    }
}