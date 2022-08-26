import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import TransportistaLayout from './TransportistaLayout';
const RutaProtegidaTransportista = () => {
    const {auth, cargando} = useAuth();

    if(cargando) return '' /// bloquea el codigo si esta true, false sigue con el return del componente
    // console.log(auth)
  return (
    <TransportistaLayout>
      {auth.ID  && auth.ID_ROL === 3 ?  '' : <Navigate to="/" />}
      <Outlet/>
  </TransportistaLayout>
  )
}

export default RutaProtegidaTransportista