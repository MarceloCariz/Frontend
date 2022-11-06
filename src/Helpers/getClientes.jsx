import clienteAxios from "../config/clienteAxios"
import { sortBy } from "../utils/sortByDate"


export const login = async(datos) =>{

        const {data} =  await clienteAxios.post('/usuario/login',{...datos, rol: "cliente"})
        return data
}


export const registrar = async(datos) =>{
    console.log(datos)
    const {data} = await clienteAxios.post('/clientes/nuevo',{...datos})
    console.log(data)
}

export const traerDatos = async(config)=>{
    const {data} = await clienteAxios('/clientes/informacion', config);
    return data
}

export const actualizarDatos = async(datos,config)=>{
    const {data} = await clienteAxios.put('/clientes/informacion/actualizar',datos, config);
    return data
}


export const enviaPedidoExt = async (productos, direccion, refigeracion, config) =>{
    const id_referencia = Math.floor(Math.random() * 1000000);
    const fecha = new Date().toLocaleDateString();;
    // console.log(fecha);
    // const fecha = new Date().toLocaleDateString("es-CL",{year: "numeric", month:"2-digit", day:"2-digit"}).replace(/-/gi,"/");

    let formData = new FormData();

    formData.append('products', JSON.stringify(productos));
    formData.append('fecha', fecha);
    formData.append('id_referencia', id_referencia);
    formData.append('direccion',direccion);
    formData.append('refigeracion', refigeracion);

    const {data} = await clienteAxios.post('/clientes/ingresar/orden', formData, config)
    console.log(data)
    return id_referencia
}
export const enviaPedidoLocal = async (productos,id_transportista ,direccion, config) =>{


    const id_referencia = Math.floor(Math.random() * 1000000);
    // const id_referencia =Date.now();

    const fecha = new Date().toLocaleDateString();

    let formData = new FormData();

    formData.append('products', JSON.stringify(productos));
    formData.append('fecha', fecha);
    formData.append('id_referencia', id_referencia);
    formData.append('direccion',direccion);
    formData.append('id_transportista', id_transportista);

    const {data} = await clienteAxios.post('/clientes/ingresar/orden/local', formData, config)
    console.log(data)
    return id_referencia
}



export const obtenerPedidos = async(config)=>{
    try {
        const {data} = await clienteAxios('/clientes/pedidos', config)

        const obj = data.reduce((acc, product)=>{
            if(!acc[product.REFERENCIA_COMPRA]){
              acc[product.REFERENCIA_COMPRA] = []
            }
            // console.log(product)
                acc[product.REFERENCIA_COMPRA].push(product)

      
            return acc
          },[]);
         
        return  obj.sort(sortBy('FECHA_COMPRA'));
    } catch (error) {
        console.log(error)
    }
}


export const pagarPedido = async(id_referencia , config, total)=>{
        


        const {data} = await  clienteAxios.post("/transbank/pagar", {total, id_referencia} ,config);
        return data


}

export const validarPedido = async(token) =>{

    try {
        const {data} = await  clienteAxios(`/transbank/validar/${token}`);
        return data
    } catch (error) {
        console.log(error)
    }

}

export const obtenerTransportistas = async() =>{
    try {
        const {data} = await clienteAxios('/transportista/');
        return data
    } catch (error) {
        console.log(error)
    }
}

export const obtenerBoleta = async(id) =>{
    try {
        const {data} = await clienteAxios(`/clientes/boleta/${id}`);
        return data.MONTO_PAGADO;
    } catch (error) {
        console.log(error)
    }
}

export const confirmarRecepcionLocal = async(referencia_compra) =>{
    try {
        const {data} = await clienteAxios.put(`/clientes/pedido/confirmar/${referencia_compra}`);
        return data;
    } catch (error) {
        console.log(error)
    }
}