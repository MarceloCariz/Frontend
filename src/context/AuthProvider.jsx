import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import { obtenerProductos } from '../Helpers/getProductores';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [carrito, setCarrito] = useState([])
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate()
    const {pathname} = useLocation();
    const [productos, setProductos] = useState({})
    const [config, setConfig] = useState({})

    // if(carrito.length === 0){
    //     setCarrito(JSON.parse(localStorage.getItem('carrito')))
    // }
    // setCarrito(localCarrito);

    useEffect(()=>{

        const autenticarUsuario = async () =>{
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false)
                return 
            }

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            
            try {
                const {data} = await clienteAxios('/usuario/perfil', config)
                setAuth(data)
                setConfig(config)

                // console.log(data.ID_ROL)
                const local = JSON.parse(localStorage.getItem('carrito'))
                // console.log(local.length > 0)
                if(pathname !== '/' && auth.ID_ROL !== 1 && local.length > 0){
                    setCarrito(local);

                    return
                }
 

                if(pathname === '/' || pathname === '/productores'){

                    if(auth.ID_ROL === 2){
                       

                        setCarrito(local);

                        navigate('/inicio')
                        return
                    }

                    navigate('/productor')
                    return
                }
       
          

                // console.log(data)
            } catch (error) {
                console.log(error)
                setAuth({})
                setProductos({})
                localStorage.clear();
                setCarrito({})
            } finally{
                setCargando(false)

            }
        }
        autenticarUsuario();
    },[navigate, setCarrito, pathname, auth.ID_ROL])

  return (
    <AuthContext.Provider value={{setAuth, auth, cargando, carrito, setCarrito, productos, setProductos, config}}> 
    {children}
</AuthContext.Provider>
  )
}

export {AuthProvider}

export default AuthContext;