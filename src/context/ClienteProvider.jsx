import { createContext, useState } from "react";
import {  obtenerPedidos, traerDatos } from "../Helpers/getClientes";
import { obtenerEnvios } from "../Helpers/getTransportista";
import { obtenerProductos as obtenerProductosClient } from '../Helpers/getProducts';
import {obtenerEnvios as obtenerEnviosProductor, obtenerProductos} from '../Helpers/getProductores';
import useAuth from "../Hooks/useAuth";





const ClienteContext = createContext();


const ClienteProvider = ({children}) => {
    const [pedidos, setPedidos] = useState([]);
    const [datos, setDatos] = useState({});
    const [productos, setProductos] = useState([]);
    const [productosBackup, setProductosBackup] = useState([]);
    const [cargando, setCargando] = useState(false);
    /// TRANSPORTISTA
    const [enviosT, setEnviosT] = useState([])
    //PRODUCTOR
    const [enviosP, setEnviosP] = useState([])
    const [productosP, setProductosP] = useState([])


    const {config, auth} = useAuth();
    ///CLIENTE
    const cargarPedidos = async () => {
        // if(pedidos.length > 0) return;
        setCargando(true);
        const resultado = await obtenerPedidos(config);
        const respuesta = await traerDatos(config);
        setPedidos(resultado);
        setDatos(respuesta);
        setCargando(false);
    };

    const cargarProductosCliente = async() =>{
        setCargando(true);
        const resultado = await obtenerProductosClient();
        if(auth.TIPO_CLIENTE === 'externo'){
            const unique = resultado.reduce((unique, o) => {
                if(!unique.some(obj => obj.NOMBRE === o.NOMBRE )) {
                unique.push(o);
                }
                return unique;
            },[]);
            setProductos(unique)
            setProductosBackup(unique);
                setCargando(false);
                return;
        }
        setProductos(resultado);
        setProductosBackup(resultado);
        setCargando(false);

      }
    /// TRANSPORTISTA
    const cargarEnviosTransportista = async() =>{
        // if(enviosT.length > 0) return;
        setCargando(true);
        const respuesta = await obtenerEnvios(config);
        setEnviosT(respuesta.sort());
        setCargando(false);
    }

    const cargarEnviosProductor = async() =>{
        // if(enviosP.length > 0) return;
        setCargando(true);
        const respuesta = await obtenerEnviosProductor(config);
        setEnviosP(respuesta.sort());
        setCargando(false);
    }
    const cargarProductosProductor = async() =>{
        // if(productosP.length > 0) return;    
        setCargando(true)
        const resultado =  await obtenerProductos(config)
        setProductosP(resultado)
        setCargando(false)
    }

    return ( <ClienteContext.Provider value={{
        datos, pedidos, cargarPedidos, cargando,setPedidos,cargarProductosCliente, productos,setProductos,productosBackup, ///////// CLIENTE
        cargarEnviosTransportista, enviosT, setEnviosT  ,    //TRANSPORTISTA
        cargarEnviosProductor, enviosP,setEnviosP ,cargarProductosProductor , productosP       /// PRODUCTOR
        }}>
        {children}
    </ClienteContext.Provider>)
}


export {ClienteProvider};


export default ClienteContext;