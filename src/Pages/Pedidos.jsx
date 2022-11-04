import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
// import {  obtenerPedidos, traerDatos } from "../Helpers/getClientes";
import useAuth from "../Hooks/useAuth";
import useConsultas from '../Hooks/useConsultas';
import { Spinnner } from "../Components/ui/Spinnner";
import { CardPedido } from "../Components/clients/pedidos/CardPedido";



const Pedidos = () => {


  const { config,auth } = useAuth();

  const {pedidos, datos, cargarPedidos, cargando} = useConsultas();
  useEffect(() => {
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
          pedidos.length  > 0
          ? pedidos.map((ele, i) => (
              <CardPedido  ele={ele} i={i} config={config} auth={auth} datos={datos}/>
            ))
          : !cargando && 'No hay pedidos'}

      </div>
    </div>
  );
};

export default Pedidos;
