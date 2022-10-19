import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import ConsultorLayout from './ConsultorLayout';
const RutaProtegidaConsultor= () => {
    const {auth, cargando} = useAuth();

    if(cargando) return '' /// bloquea el codigo si esta true, false sigue con el return del componente
    // console.log(auth)
  return (
    <ConsultorLayout>
      {auth.ID  && auth.ID_ROL === 4 ?  '' : <Navigate to="/" />}
      <Outlet/>
  </ConsultorLayout>
  )
}

export default RutaProtegidaConsultor