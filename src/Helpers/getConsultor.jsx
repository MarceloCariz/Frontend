import clienteAxios from "../config/clienteAxios"
import { sortBy } from "../utils/sortByDate"

export const login = async(datos) =>{

    const {data} =  await clienteAxios.post('/usuario/login',{...datos, rol: "consultor"})
    return data
}


export const obtenerDatosGraficos = async() =>{
    try {
        const {data} = await  clienteAxios('/admin/envios/graficos/datos');
        // console.log(data[graficoName])
        return data
    } catch (error) {
        console.log("Error GetAdmins.jsx | Tipo: Get | Act: obtenerOrdCompra")
        console.log(error)
        console.log("Error GetAdmins.jsx ==================================")
    }
}

export const generarReporte = async(datos) =>{
    console.log(datos)
    const fechaReporte = new Date().toLocaleDateString();
    const formData = new FormData();
    // tipoCliente, comprasMes, estadoPagos, cantidadProductos, comprasDias
    formData.append("tipoCliente",JSON.stringify(datos.tipoVenta ));
    formData.append("comprasMes",JSON.stringify(datos.comprasPorMes ));
    formData.append("estadoPagos",JSON.stringify(datos.estadoPago ));
    formData.append("cantidadProductos",JSON.stringify(datos.stockProductosNombre ));
    formData.append("comprasDias", JSON.stringify(datos.comprasPorDia ));
    formData.append("topCincoProductos", JSON.stringify(datos.topCincoProductos ));
    formData.append("clienteTop", JSON.stringify(datos.clienteMayorVentas ));
    formData.append("usuario", "consultor");
    formData.append("fechaReporte",fechaReporte);
    formData.append("reporte", datos.pdfGenerado)
    try {
        const {data} = await clienteAxios.post('/admin/envios/reporte', formData);
        return data        
    } catch (error) {
        console.log(error)
    }
}


export const listarReportes = async() =>{
    try {
        const {data} = await clienteAxios('/admin/envios/reporte/listar');
        // console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}