import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import ClienteLayout from './ClienteLayout';
const RutaProtegida = () => {

  const {auth, cargando} = useAuth();

  if(cargando) return 'Cargando...' /// bloquea el codigo si esta true, false sigue con el return del componente
  return (
    <>
      <ClienteLayout>
        {auth.ID ? '' : <Navigate to="/" />}
        <Outlet/>
        </ClienteLayout>
    </>
  )
}

export default RutaProtegida