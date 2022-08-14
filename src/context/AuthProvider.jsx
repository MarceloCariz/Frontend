import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate()
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
                const {data} = await clienteAxios('/clientes/perfil', config)
                console.log(data)
                setAuth(data)
                navigate('/inicio')
                // console.log(data)
            } catch (error) {
                console.log(error)
                setAuth({})
            } finally{
                setCargando(false)

            }
        }
        autenticarUsuario();

    },[navigate])

  return (
    <AuthContext.Provider value={{setAuth, auth, cargando}}> 
    {children}
</AuthContext.Provider>
  )
}

export {AuthProvider}

export default AuthContext;