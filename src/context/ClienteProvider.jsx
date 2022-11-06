import { createContext, useState } from "react";
import {  obtenerPedidos, traerDatos } from "../Helpers/getClientes";
import { obtenerEnvios } from "../Helpers/getTransportista";
import { obtenerProductos as obtenerProductosClient } from '../Helpers/getProducts';
import {obtenerEnvios as obtenerEnviosProductor, obtenerProductos} from '../Helpers/getProductores';
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";





const ClienteContext = createContext();


const ClienteProvider = ({children}) => {
    const [pedidos, setPedidos] = useState([]);
    const [datos, setDatos] = useState({});
    const [productos, setProductos] = useState([]);
    const [productosBackup, setProductosBackup] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [formValues, setFormValues] = useState({direccion: '', ciudad: '',pais:''})
    /// TRANSPORTISTA
    const [enviosT, setEnviosT] = useState([])
    //PRODUCTOR
    const [enviosP, setEnviosP] = useState([])
    const [productosP, setProductosP] = useState([])


    const {config, auth, setCarrito, setAuth} = useAuth();
    const navigate = useNavigate();   
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
    const cargarDatos = async() =>{
        const resp = await traerDatos(config);
        setFormValues({
            direccion: resp.DIRECCION || '',
            ciudad: resp.CIUDAD || '',
            pais: resp.PAIS || '',
        })
    } 

    const cargarProductosCliente = async() =>{
        setCargando(true);
        const resultado = await obtenerProductosClient(auth);
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
        // console.log('pase')
        
        setProductos(resultado);
        setProductosBackup(resultado);
        setCargando(false);

    }
    /// TRANSPORTISTA
    const cargarEnviosTransportista = async() =>{
        // if(enviosT.length > 0) return;
        setCargando(true);
        const respuesta = await obtenerEnvios(config);
        setEnviosT(respuesta);
        setCargando(false);
    }

    const cargarEnviosProductor = async() =>{
        // if(enviosP.length > 0) return;
        setCargando(true);
        const respuesta = await obtenerEnviosProductor(config);
        setEnviosP(respuesta);
        setCargando(false);
    }
    const cargarProductosProductor = async() =>{
        // if(productosP.length > 0) return;    
        setCargando(true)
        const resultado =  await obtenerProductos(config)
        setProductosP(resultado)
        setCargando(false)
    }
    const handleLogout = () => {
        localStorage.clear();
        setCarrito([]);
        setPedidos([]);
        setProductos([]);
        setFormValues({ciudad: "", pais:"", direccion: ""})
        setProductosBackup([]);
        setAuth({});
        navigate("/");
      };

    return ( <ClienteContext.Provider value={{
        datos, pedidos, cargarPedidos, cargando,setPedidos,cargarProductosCliente, productos,setProductos,productosBackup, cargarDatos, setFormValues, formValues, ///////// CLIENTE
        cargarEnviosTransportista, enviosT, setEnviosT  ,    //TRANSPORTISTA
        cargarEnviosProductor, enviosP,setEnviosP ,cargarProductosProductor , productosP ,      /// PRODUCTOR
        handleLogout
        }}>
        {children}
    </ClienteContext.Provider>)
}


export {ClienteProvider};


export default ClienteContext;