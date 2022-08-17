import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import AuthLayout from '../Layouts/AuthLayout'
import RutaProtegida from '../Layouts/RutaProtegida'
import Carrito from '../Pages/Carrito'
import Inicio from '../Pages/Inicio'
import Login from '../Pages/Login'
import LoginP from '../Pages/Productores/LoginP'
import RegistrarP from '../Pages/Productores/RegistrarP'
import Registrar from '../Pages/Registrar'

const AppRouter = () => {
  return (
    <BrowserRouter>
    <AuthProvider>

        <Routes>
            <Route path="/"  element={<AuthLayout/>}>
                <Route index element={<Login/>}/>
                <Route path='registrar' element={<Registrar/>}/>
                <Route path='productores' element={<LoginP/>}/>
                <Route path='registrar-productores'element={<RegistrarP/>}/>
            </Route>

        <Route path='/inicio' element={<RutaProtegida/>}>
          <Route index element={<Inicio/>}/>
          <Route path='carrito' element={<Carrito/>}/>
        </Route>

        {/* PRODUCTORES */}
        <Route path='/'>
          
        </Route>
        </Routes>

      </AuthProvider>

  </BrowserRouter>
  )
}

export default AppRouter