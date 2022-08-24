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

export const actualizarProducto = async (producto) =>{
    console.log(producto)
    try {
        const {data} = await clienteAxios.put('/productores/productos/editar', producto,config)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const eliminarProducto = async(id) =>{
    try {
        const {data} = await clienteAxios.delete(`/productores/productos/eliminar/${id}`, config)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const agregarProducto = async(producto) =>{
    try {
        const {data} = await clienteAxios.post('/productores/productos/nuevo', producto, config)
        return data
    } catch (error) {
        console.log(error)
    }
}