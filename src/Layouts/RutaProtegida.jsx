import React, { useEffect } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import ClienteLayout from './ClienteLayout';
const RutaProtegida = () => {

  const {auth, cargando, setCargando} = useAuth();
  const navigate = useNavigate()

  if(cargando) return ''
  return (
    <>
      <ClienteLayout>
        {auth.ID  && auth.ID_ROL === 2 ? '' : <Navigate to={ auth.ID_ROL === 1 ? "/inicio-productor" : '/'} />}

        <Outlet/>
        </ClienteLayout>
    </>
  )
}

export default RutaProtegida