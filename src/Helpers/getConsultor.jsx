import clienteAxios from "../config/clienteAxios"

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