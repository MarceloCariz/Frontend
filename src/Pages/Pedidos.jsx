import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {  obtenerPedidos, traerDatos } from "../Helpers/getClientes";
import useAuth from "../Hooks/useAuth";
import { Spinnner } from "../Components/ui/Spinnner";
import { CardPedido } from "../Components/clients/pedidos/CardPedido";



const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [datos, setDatos] = useState({});
  const [cargando, setCargando] = useState(false)

  const { config,auth } = useAuth();

  useEffect(() => {
    const cargarPedidos = async () => {
      setCargando(true);
      const resultado = await obtenerPedidos(config);
      const respuesta = await traerDatos(config);
      setPedidos(resultado);
      setDatos(respuesta);
      setCargando(false)
    };
    cargarPedidos();
  }, [config]);



  


  // const pedidosMemo = useMemo(() => pedidos, [pedidos]);

  return (
    <div >
      <p className="sm:text-3xl text-2xl text-center font-semibold">
        <FontAwesomeIcon className="mr-2" icon={faClipboardList}/>
        Pedidos
      </p>
      <div className="flex justify-center flex-col items-center mx-auto pt-12">
        {cargando &&  <Spinnner color="black" tamano={12}/>}
        {
          pedidos.length && !cargando > 0
          ? pedidos.map((ele, i) => (
              <CardPedido ele={ele} i={i} config={config} auth={auth} datos={datos}/>
            ))
          : cargando ? '' : 'No hay pedidos'}

      </div>
    </div>
  );
};

export default Pedidos;
