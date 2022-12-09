import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import ClienteLayout from './ClienteLayout';
const RutaProtegida = () => {

  const {auth, cargando} = useAuth();
  if(cargando) return ''
  return (
    <>
      <ClienteLayout>
      {auth.ID  && auth.ID_ROL === 5 ?  '' : <Navigate to="/" />}


        <Outlet/>
        </ClienteLayout>
    </>
  )
}

export default RutaProtegida