import React, { useEffect } from 'react'
import { Buscador } from '../Components/clients/layout/Buscador';
import Productos from '../Components/clients/Productos'
import { Spinnner } from '../Components/ui/Spinnner';
import useAuth from '../Hooks/useAuth'
import useConsultas from '../Hooks/useConsultas';

const Inicio = () => {
  const {auth} = useAuth();
  // const [productos, setProductos] = useState({})
  const {cargarProductosCliente,productos, cargando} = useConsultas();
  useEffect(()=>{
    cargarProductosCliente();
  },[])
  return (
    <div className="sm:pt-8 container mx-auto sm:pb-0 pb-32">
        <h2 className='text-left text-3xl font-semibold ml-4 sm:ml-4 2xl:ml-0'>Nuestros Productos</h2>
        <div className="w-full px-2 border border-1 lg:hidden mt-2">
              <Buscador />
        </div>
        {cargando && productos.length === 0 && (<div className='flex justify-center items-center mt-12'><Spinnner/></div>) }
        {productos.length > 0 ? 
          <Productos productos={productos} tipo={auth.TIPO_CLIENTE}/>
          : !cargando && 'No hay productos'
      }
    </div>
  )
}

export default Inicio