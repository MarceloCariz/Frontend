import clienteAxios from "../config/clienteAxios"
import { sortBy } from "../utils/sortByDate"

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
        // const {headers} = configt;
        console.log(producto, configt)
        const {data}= await clienteAxios.post(`/productores/productos/nuevo`, producto, configt)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const obtenerSubastasActivas = async()=>{
    try {
        const {data} = await clienteAxios('/productores/subastas');
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}


export const obtenerEnvios = async(config) =>{
    try {
        const {data} = await clienteAxios('/productores/envios', config);
        const obj = data.reduce((acc, product)=>{
            if(!acc[product.REFERENCIA_COMPRA]){
                acc[product.REFERENCIA_COMPRA] = []
            }
            // console.log(product)
            acc[product.REFERENCIA_COMPRA].push(product)

            return acc
          },[]);
         
        //   console.log(obj.map((e)=>(e.sort((a,b)=> new Date(a.FECHA_COMPRA)  - new Date(b.FECHA_COMPRA)))));
        // const prueba =
        // console.log(prueba)
        
        //  console.log( obj.sort((a,b)=> new Date(a[0].FECHA_COMPRA)  + new Date(b[0].FECHA_COMPRA)))

        return  obj.sort(sortBy('FECHA_COMPRA'));
    } catch (error) {
        console.log(error)
    }
}

export const obtenerEnviosCompletados = async(config) =>{
    try {
        const {data} =  await clienteAxios('/productores/envios/completados', config);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const confirmarEnvioBodega = async(referencia_compra, config) =>{
    // referencia_compra = (referencia_compra.toString());
    // console.log(referencia_compra)
    console.log(config)
    try {
        const {data} =await  clienteAxios.put(`/productores/envios/bodega/confirmar`, {referencia_compra},config);
        return data;
    } catch (error) {
        console.log(error.response.data.msg)
    }
}
export const obtenerContrato = async(config) =>{
    try {
        const {data} = await clienteAxios.get('/productores/contrato', config);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const solicitudContrato = async(id_contrato) =>{
    try {
        const {data} = await clienteAxios.put(`/productores/contrato/solicitud/${id_contrato}`);
        return data;
    } catch (error) {
        console.log(error)
    }
}