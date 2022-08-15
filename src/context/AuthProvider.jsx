import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [carrito, setCarrito] = useState([])
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate()
    const {pathname} = useLocation();

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
                const local = JSON.parse(localStorage.getItem('carrito'))
                const {data} = await clienteAxios('/clientes/perfil', config)
                setAuth(data)
                if(pathname !== '/inicio'){
                setCarrito(JSON.parse(localStorage.getItem('carrito')));

                    return
                }else{
                setCarrito(local ? local : '' );

                navigate('/inicio')
                }
                // console.log(data)
            } catch (error) {
                console.log(error)
                setAuth({})
            } finally{
                setCargando(false)

            }
        }
        autenticarUsuario();
    },[navigate, setCarrito, pathname])

  return (
    <AuthContext.Provider value={{setAuth, auth, cargando, carrito, setCarrito}}> 
    {children}
</AuthContext.Provider>
  )
}

export {AuthProvider}

export default AuthContext;