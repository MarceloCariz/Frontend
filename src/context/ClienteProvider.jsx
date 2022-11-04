import { createContext, useState } from "react";
import {  obtenerPedidos, traerDatos } from "../Helpers/getClientes";
import { obtenerEnvios } from "../Helpers/getTransportista";
import {obtenerEnvios as obtenerEnviosProductor, obtenerProductos} from '../Helpers/getProductores';
import useAuth from "../Hooks/useAuth";





const ClienteContext = createContext();


const ClienteProvider = ({children}) => {
    const [pedidos, setPedidos] = useState([]);
    const [datos, setDatos] = useState({});
    const [cargando, setCargando] = useState(false);
    /// TRANSPORTISTA
    const [enviosT, setEnviosT] = useState([])
    //PRODUCTOR
    const [enviosP, setEnviosP] = useState([])
    const [productosP, setProductosP] = useState([])


    const {config} = useAuth();
    ///CLIENTE
    const cargarPedidos = async () => {
        setCargando(true);
        const resultado = await obtenerPedidos(config);
        const respuesta = await traerDatos(config);
        setPedidos(resultado);
        setDatos(respuesta);
        setCargando(false);
    };

    const cargarEnviosTransportista = async() =>{
        setCargando(true);
        const respuesta = await obtenerEnvios(config);
        setEnviosT(respuesta.sort());
        setCargando(false);
    }

    const cargarEnviosProductor = async() =>{
        setCargando(true);
        const respuesta = await obtenerEnviosProductor(config);
        setEnviosP(respuesta.sort());
        setCargando(false);
    }
    const cargarProductosProductor = async() =>{
        setCargando(true)
        const resultado =  await obtenerProductos(config)
        setProductosP(resultado)
        setCargando(false)
    }

    return ( <ClienteContext.Provider value={{
        datos, pedidos, cargarPedidos, cargando, ///////// CLIENTE
        cargarEnviosTransportista, enviosT,       //TRANSPORTISTA
        cargarEnviosProductor, enviosP ,cargarProductosProductor , productosP       /// PRODUCTOR
        }}>
        {children}
    </ClienteContext.Provider>)
}


export {ClienteProvider};


export default ClienteContext;