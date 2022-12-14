import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import io from 'socket.io-client'
import CardSubasta from '../../Components/productores/CardSubasta';
import { Spinnner } from '../../Components/ui/Spinnner';
import { obtenerContrato, obtenerProductos, obtenerSubastasActivas } from '../../Helpers/getProductores';
import useAuth from '../../Hooks/useAuth';

const Subastas = () => {
  const { auth, config} = useAuth();
  // const [hora, setHora] = useState('')
  const [cargando, setCargando] = useState(false)
  const [productos, setProductos] = useState([])
  const [contrato, setContrato] = useState({})
  const [subastas, setSubastas] = useState([])
  const [resultado, setResultado] = useState([]);
  const [verProductos, setVerProductos] = useState(true);
  // const [minutos, setMinutos] = useState(0)

    let activo = true;
    // let  socket;
    // const  socket = activo && io('http://168.138.133.24:4000', {reconnection: false});
    // const  socket = activo && io('http://localhost:4000', {reconnection: true});
    const  socket = activo && io(process.env.REACT_APP_SOCKET, {reconnection: false});

  useEffect(() => {
   
  
    const cargarDatos = async() =>{
      setCargando(true);
      const contract = await obtenerContrato(config);
      setContrato(contract);
      const products = await obtenerProductos(config);
      setProductos(products);
      const resultado = await  obtenerSubastasActivas();
      setSubastas(resultado);
      setCargando(false);
    }
    cargarDatos();

  }, [config])
  const set = new Set(resultado.map(JSON.stringify));
  const arrSinDuplicaicones = Array.from(set).map(JSON.parse);
  return (
    <div className="mx-auto container text-center pt-10 px-1">
      <h1 className="text-3xl font-semibold">Subasta Disponibles</h1>
      <div className="flex justify-center mt-12 gap-2">
      {cargando && <Spinnner/>}
      {contrato && contrato.ESTADO === "TRUE" && !cargando ? (
        <>
          <div className=" flex-1 flex sm:flex-row  gap-2 items-start flex-wrap ">
            {subastas.length > 0 ? (
              subastas.map((subasta) => (
                <div className='flex flex-col' key={subasta.ID}>
                  { arrSinDuplicaicones.length > 0  && arrSinDuplicaicones.map(({ idSubasta, mensaje})=>(
                    <div className="  mb-2 " key={idSubasta}>
                    <p className="bg-green-500 text-white text-center px-2  rounded-lg"> 
                    { idSubasta === subasta.ID ? mensaje : ""}</p>
                  </div>))
                  }
                  <CardSubasta
                  key={subasta.ID}
                  subasta={subasta}
                  socket={socket}
                  activo={activo}
                  auth={auth}
                  productos={productos}
                  setResultado={setResultado}
                  resultado={resultado}
                />
                

                </div>

              ))
            ) : (
              <p className="text-center mx-auto pl-16 sm:pl-40 capitalize font-semibold">
                No hay subastas disponibles
              </p>
            )}
          </div>
          <aside className=''>
            <button  onClick={()=>setVerProductos(!verProductos)} className='sm:hidden inline-block text-sm bg-blue-500 px-2 py-1 text-white'>
              {verProductos ? "Ocultar Productos" : "Ver productos"} 
            </button>
            <div className={verProductos ? "block" : "hidden"}>
              <p className="text-lg font-semibold">Mis productos</p>
              <hr className="h-2" />
              {productos.length > 0
                ? productos.map((producto) => (
                    <div
                      key={producto.ID_PRODUCTO}
                      className="flex gap-4 mb-4 capitalize items-center sm:text-xl"
                    >
                      <img
                        className="object-contain w-12 h-12"
                        src={producto.IMAGE_URL}
                        alt=""
                      />
                      <div className="flex flex-col text-left">
                        <p>{producto.NOMBRE}</p>
                        <p> Cantidad: {producto.CANTIDAD}</p>
                        <p>Precio : {producto.PRECIO_EXP}</p>
                      </div>

                      {/* <button onClick={(e)=>handleClick(producto,e)}>Enviar</button> */}
                    </div>
                  ))
                : productos.length === 0 ? "no hay productos" : "...cargando"}
            </div>
            
          </aside>

          </>
      ) : 
      !cargando && <Link to="/productor/perfil" className='px-4 py-4 bg-blue-500 text-white'>Solicite aqu?? la renovaci??n de su contrato</Link>
      }

      </div>

      {/* {
            productos.length > 0 ? productos.map((producto)=>(
                <div key={producto.ID_PRODUCTO}>
                    <button onClick={(e)=>handleClick(producto,e)}>Enviar</button>
                </div>
            )):'no'
        } */}
    </div>
  );
}

export default Subastas


// {alerta  && (<p className='bg-red-500'>{alerta}</p>) }
// <p>Productos Necesarios  :  {NOMBRE_PRODUCTO}</p>
// {/* disabled={minutos === null ? true : false} */}
// <button  onClick={(e) => handleClick({REFERENCIA_COMPRA, FECHA_ACTIVACION, NOMBRE_PRODUCTO},e)} className='bg-green-500 px-4 py-2 text-white'>POSTULAR</button>
// <p>{minutos === null  ? "" :  hora}</p>
// <p>{minutos === null ? "Subasta Finalizada" : minutos.toFixed(0)+" minutos para finalizar"} </p>
// <p className='bg-gray-400 px-2 '>Tus productos Seleccionados</p>
// <div className='flex '>
//   {resultado.length > 0 && (

//   resultado.map((producto)=>(
//     <div className='text-center  mb-4 '>
//       <p>Nombre: {producto.NOMBRE}</p>
//       <p>Precio_exp: {producto.PRECIO_EXP}</p>
//       <hr  className=''/>
//     </div>
//    ))
//   )}
// </div>