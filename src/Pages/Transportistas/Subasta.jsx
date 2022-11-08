import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import CardSubasta from '../../Components/transportistas/CardSubasta'
import { obtenerContrato, obtenerPerfil, obtenerSubastas } from '../../Helpers/getTransportista'
import useAuth from '../../Hooks/useAuth';

const Subasta = () => {
  const [cargando, setCargando] = useState(false)
  const [subasta, setSubasta] = useState([]);
  const [contrato, setContrato] = useState({});
  const [perfil, setPerfil] = useState({});

  let activo = true;

  // const  socket = activo && io('http://localhost:4000', {reconnection: false});
  const  socket = activo && io(process.env.REACT_APP_SOCKET, {reconnection: false});


  const {auth, config} = useAuth();
  useEffect(() => {
    const cargarSubastas = async()=>{
      setCargando(true)
      const resultado = await obtenerSubastas();
      setSubasta(resultado);
      const respuesta = await obtenerPerfil(config);
      setPerfil(respuesta);
      const contrato = await obtenerContrato(config);
      setContrato(contrato);
      setCargando(false)

    }


    cargarSubastas();
  }, [config])
  // const handleClick = (e) =>{
    
  // }
  return (
    <div className="mx-auto container text-center pt-10 ">
      <h1 className="text-3xl font-semibold">Subasta Disponibles</h1>
      <div className="flex justify-center mt-12 gap-2">
        {contrato.ESTADO === "TRUE"  && !cargando ? (
        <>
          {subasta.length > 0 ? subasta.map((subasta, key) =>
          (<CardSubasta  key={key} subasta={subasta} auth={auth} socket={socket} perfil={perfil}/>))
          : 'No hay Subastas'}
        </>
        ): !cargando && <Link to="/transportista/perfil" className='px-4 py-4 bg-blue-500 text-white'>Solicite aquí la renovación de su contrato</Link>}
        

      </div>
      {/* {subasta.length > 0 ? subasta.map((subasta)=>(
        <CardSubasta                  key={subasta.ID}
        subasta={subasta}
        minutos={minutos}
        alerta={alerta}
        resultado={resultado}
        handleClick={handleClick}
        hora={hora}/>
      )) : 'No hay subasta'} */}
    </div>
  )
}

export default Subasta