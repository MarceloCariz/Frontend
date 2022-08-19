import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import ProductorLayout from './ProductorLayout';
const RutaProtegidaProductor = () => {
    const {auth, cargando} = useAuth();

    if(cargando) return 'Cargando...' /// bloquea el codigo si esta true, false sigue con el return del componente
    console.log(auth)
  return (
    <ProductorLayout>
      {auth.ID  && auth.ID_ROL === 1 ?  '' : <Navigate to="/" />}
      <Outlet/>
  </ProductorLayout>
  )
}

export default RutaProtegidaProductor