import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import CardSubasta from '../../Components/transportistas/CardSubasta'
import { obtenerContrato, obtenerPerfil, obtenerSubastas } from '../../Helpers/getTransportista'
import useAuth from '../../Hooks/useAuth';

const Subasta = () => {
  const [subasta, setSubasta] = useState([]);
  const [contrato, setContrato] = useState({});
  const [perfil, setPerfil] = useState({});

  let activo = true;

  // const  socket = activo && io('http://localhost:4000', {reconnection: false});
  const  socket = activo && io(process.env.REACT_APP_SOCKET, {reconnection: false});


  const {auth, config} = useAuth();
  useEffect(() => {
    const cargarSubastas = async()=>{
      const resultado = await obtenerSubastas();
      setSubasta(resultado);
      const respuesta = await obtenerPerfil(config);
      setPerfil(respuesta);
      const contrato = await obtenerContrato(config);
      setContrato(contrato);
    }


    cargarSubastas();
  }, [config])
  // const handleClick = (e) =>{
    
  // }
  return (
    <div className="mx-auto container text-center pt-10 ">
      <h1 className="text-3xl font-semibold">Subasta Disponibles</h1>
      <div className="flex justify-center mt-12 gap-2">
        {contrato.ESTADO === "TRUE" ? (
        <>
          {subasta.length > 0 ? subasta.map((subasta, key) =>
          (<CardSubasta  key={key} subasta={subasta} auth={auth} socket={socket} perfil={perfil}/>))
          : 'NO hay Subastas'}
        </>
        ): <Link to="/transportista/perfil" className='px-4 py-4 bg-blue-500 text-white'>Solicite aquí la renovación de su contrato</Link>}
        

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