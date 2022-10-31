import React, { useEffect, useState } from 'react'
import Productos from '../Components/clients/Productos'
import { obtenerProductos } from '../Helpers/getProducts'
import useAuth from '../Hooks/useAuth'

const Inicio = () => {
  const {auth} = useAuth();
  const [productos, setProductos] = useState({})
  useEffect(()=>{

      const id_referencia =Date.now().toString();
      console.log(id_referencia.length);

      const cargarProductos = async() =>{
        const resultado = await obtenerProductos();
        if(auth.TIPO_CLIENTE === 'externo'){
          const unique = resultado.reduce((unique, o) => {
            if(!unique.some(obj => obj.NOMBRE === o.NOMBRE )) {
              unique.push(o);
            }
            return unique;
          },[]);
          setProductos(unique)
          return;
        }
        setProductos(resultado)
      }

      cargarProductos();
  },[auth.TIPO_CLIENTE])
  return (
    <div className="pt-8 container mx-auto">
        <h2 className='text-left text-3xl font-semibold ml-4 sm:ml-0'>Nuestros Productos</h2>
        
        <Productos productos={productos} tipo={auth.TIPO_CLIENTE}/>
    </div>
  )
}

export default Inicio