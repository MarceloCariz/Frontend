import axios from "axios"
import clienteAxios from "../config/clienteAxios"


export const login = async(datos) =>{

        const {data} =  await clienteAxios.post('/usuario/login',{...datos, rol: "cliente"})
        return data
}


export const registrar = async(datos) =>{
    console.log(datos)
    const {data} = await clienteAxios.post('/clientes/nuevo',{...datos, tipo: 'Local'})
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


export const enviaPedidoExt = async (productos, direccion, config) =>{
    const id_referencia = Math.floor(Math.random() * 1000000);
    const fecha = new Date().toLocaleDateString();

    let formData = new FormData();

    formData.append('products', JSON.stringify(productos));
    formData.append('fecha', fecha);
    formData.append('id_referencia', id_referencia);
    formData.append('direccion',direccion);




    const {data} = await clienteAxios.post('/clientes/ingresar/orden', formData, config)
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
         

        return obj
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
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }

}