import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import AuthLayout from '../Layouts/AuthLayout'
import RutaProtegida from '../Layouts/RutaProtegida'
import RutaProtegidaProductor from '../Layouts/RutaProtegidaProductor'
import RutaProtegidaTransportista from '../Layouts/RutaProtegidaTransportista'
import Carrito from '../Pages/Carrito'
import Inicio from '../Pages/Inicio'
import Login from '../Pages/Login'
import Pago from '../Pages/Pago'
import Pedidos from '../Pages/Pedidos'
import Perfil from '../Pages/Perfil'
import Envios from '../Pages/Productores/Envios'
import InicioP from '../Pages/Productores/InicioP'
import LoginP from '../Pages/Productores/LoginP'
import PerfilP from '../Pages/Productores/Perfil'
import RegistrarP from '../Pages/Productores/RegistrarP'
import Subastas from '../Pages/Productores/Subastas'
import Registrar from '../Pages/Registrar'
// import InicioTransportista from '../Pages/Transportistas/InicioTransportista'
import LoginTransportista from '../Pages/Transportistas/LoginTransportista'
import PerfilT from '../Pages/Transportistas/PerfilT'
import EnviosT from '../Pages/Transportistas/EnviosT'
import Subasta from '../Pages/Transportistas/Subasta'
import RutaProtegidaConsultor from '../Layouts/RutaProtegidaConsultor'
import LoginConsultor from '../Pages/Consultor/LoginConsultor'
import InicioConsultor from '../Pages/Consultor/InicioConsultor'
import Reportes from '../Pages/Consultor/Reportes'
import { ClienteProvider } from '../context/ClienteProvider'
import { Error } from '../Pages/Error'

const AppRouter = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <ClienteProvider>

              <Routes>
                  <Route path="/"  element={<AuthLayout/>}>
                      <Route index element={<Login/>}/>
                      <Route path='registrar' element={<Registrar/>}/>
                      <Route path='productores' element={<LoginP/>}/>
                      <Route path='transportistas' element={<LoginTransportista/>}/>
                      <Route path='consultores' element={<LoginConsultor/>}/>
                      <Route path='registrar-productores'element={<RegistrarP/>}/>
                  </Route>
                  <Route path='*' element={<Error/>}/>
                <Route path='/inicio' element={<RutaProtegida/>}>
                  <Route index element={<Inicio/>}/>
                  <Route path='carrito' element={<Carrito/>}/>
                  <Route path='perfil' element={<Perfil/>}/>
                  <Route path='pedidos' element={<Pedidos/>}/>
                  <Route path='pago' element={<Pago/>}/>
                </Route>

              {/* PRODUCTORES */}
              <Route path='/productor' element={<RutaProtegidaProductor/>}>
                    <Route index element={<InicioP/>}/>
                    <Route path='subastas' element={<Subastas/>}/>
                    <Route path='envios' element={<Envios/>}/>
                    <Route path='perfil' element={<PerfilP/> } />
              </Route>

              {/* TRANSPORTISTA */}
              <Route path='/transportista' element={<RutaProtegidaTransportista/>}>
                {/* <Route index element={<LoginTransportista/>}/> */}
                <Route index element={<PerfilT/>}/>
                <Route path='perfil' element={<PerfilT/> } />
                <Route path='subastas' element={<Subasta/>}/>
                <Route path='envios' element={<EnviosT/>}/>

              </Route>
              {/* CONSULTOR */}
              <Route path='/consultor' element={<RutaProtegidaConsultor/>}>
                {/* <Route index element={<LoginTransportista/>}/> */}
                <Route index element={<InicioConsultor/>}/>
                <Route path='reportes' element={<Reportes/>}/>

              </Route>

            </Routes>
          </ClienteProvider>

      </AuthProvider>

  </BrowserRouter>
  )
}

export default AppRouter