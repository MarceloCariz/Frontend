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


export const enviaPedidoExt = async(productos, direccion, config) =>{
    const id_referencia = Math.floor(Math.random() * 1000000);
    const fecha = new Date().toLocaleDateString();
    let promises = [];
  
    for(const  p  in productos){
        const {CANTIDAD, NOMBRE, unidad} = productos[p];
        const productoFinal = { cantidad: CANTIDAD,nombre_producto: NOMBRE, peso: unidad, direccion, fecha_compra:fecha, id_referencia}
        console.log(fecha)
        console.log(productoFinal)
        promises.push(
          clienteAxios.post('/clientes/ingresar/orden', productoFinal, config)
        )
    }
    console.log('termine')

    const data =  await Promise.all(promises)
    return data;
}