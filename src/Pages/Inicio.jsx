import React, { useEffect, useState } from 'react'
import { Buscador } from '../Components/clients/layout/Buscador';
import Productos from '../Components/clients/Productos'
import { Spinnner } from '../Components/ui/Spinnner';
import { obtenerProductos } from '../Helpers/getProducts';
import useAuth from '../Hooks/useAuth'
import useConsultas from '../Hooks/useConsultas';

const Inicio = () => {
  const {auth} = useAuth();
  // const [productos, setProductos] = useState({})
  const {cargarProductosCliente, productos, cargando} = useConsultas();
  useEffect(()=>{

      // const id_referencia =Date.now().toString();
      // console.log(id_referencia.length);

      // const cargarProductos = async() =>{
      //   const resultado = await obtenerProductos();
      //   if(auth.TIPO_CLIENTE === 'externo'){
      //     const unique = resultado.reduce((unique, o) => {
      //       if(!unique.some(obj => obj.NOMBRE === o.NOMBRE )) {
      //         unique.push(o);
      //       }
      //       return unique;
      //     },[]);
      //     setProductos(unique)
      //     return;
      //   }
      //   setProductos(resultado)
  // }

      cargarProductosCliente();
  },[])
  return (
    <div className="sm:pt-8 container mx-auto">
        <h2 className='text-left text-3xl font-semibold ml-4 sm:ml-0'>Nuestros Productos</h2>
        <div className="w-full px-2 border border-1 sm:hidden mt-2">
              <Buscador />
        </div>
        {cargando && productos.length === 0 && <Spinnner/>}
        {productos.length > 0 ? 
          <Productos productos={productos} tipo={auth.TIPO_CLIENTE}/>
          : !cargando && 'No hay productos'
      }
    </div>
  )
}

export default Inicio