import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useRef, useState } from "react";
import {  obtenerPedidos, traerDatos } from "../Helpers/getClientes";
import { InformacionPedido } from "../Components/clients/pedidos/InformacionPedido";
import { BotonRecibido } from "../Components/clients/pedidos/BotonRecibido";
import { BotonBoleta } from "../Components/clients/pedidos/BotonBoleta";
import useAuth from "../Hooks/useAuth";
import { Cabecera } from "../Components/clients/pedidos/Cabecera";
import { Spinnner } from "../Components/ui/Spinnner";
import { BotonPagarExt } from "../Components/clients/pedidos/BotonPagarExt";



const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [datos, setDatos] = useState({});
  const [show, setShow] = useState(false);
  const [cargando, setCargando] = useState(false)

  const { config,auth } = useAuth();
  const idPedido = useRef();

  useEffect(() => {
    const cargarPedidos = async () => {
      setCargando(true);
      const resultado = await obtenerPedidos(config);
      const respuesta = await traerDatos(config);
      console.log(resultado)
      setPedidos(resultado);
      setDatos(respuesta);
      setCargando(false)
    };
    cargarPedidos();
  }, [config]);

  const onClick = (e) => {
    // console.log(e.i)
    idPedido.current.id = e.i;
    setShow(!show);
  };

  


  const pedidosMemo = useMemo(() => pedidos, [pedidos]);

  return (
    <div >
      <p className="sm:text-3xl text-2xl text-center font-semibold">
        <FontAwesomeIcon className="mr-2" icon={faClipboardList}/>
        Pedidos
      </p>
      <div className="flex justify-center flex-col items-center mx-auto pt-12">
        {cargando &&  <Spinnner color="black" tamano={12}/>}
        {
          pedidosMemo.length && !cargando > 0
          ? pedidosMemo.map((ele, i) => (
              <div key={ele[0].REFERENCIA_COMPRA} className="sm:w-2/5 flex flex-col text-left justify-center items-center mb-4 rounded-lg bg-white shadow-xl px-4 py-4">
                <Cabecera i={i} idPedido={idPedido} onClick={onClick} show={show} ele={ele}/>


                <p className="font-semibold sm:mt-4 ">
                  Fecha de compra: {ele[0].FECHA_COMPRA}
                </p>

                {show && Number(idPedido.current.id) === i &&
                  ( <InformacionPedido informacion={ele} total={ele.reduce((total, i)=>((i.PRECIO *Number(i.CANTIDAD)) + total),0)}/>)
                }
                
                {
                  ele[0].ESTADO_ENVIO === 'enviado' && 
                  <BotonRecibido referencia_compra ={ele[0].REFERENCIA_COMPRA} />
                }
                {
                   ele[0].ESTADO_ENVIO === 'recibido' &&  ele[0].ESTADO_PAGO === 'pendiente' &&
                   <BotonPagarExt referencia_compra ={ele[0].REFERENCIA_COMPRA} total={ele.reduce((total, i)=>((i.PRECIO *Number(i.CANTIDAD)) + total),ele[0].PRECIOT)} config={config}/>
                }

                <p className="text-xl font-semibold ">{ele[0].ESTADO_PAGO === 'PAGADO' ? 'Total Pagado' : 'Total a pagar'}:
                  {ele.reduce((total, i)=>((Number(i.PRECIO) * Number(i.CANTIDAD)  ) + total) ,ele[0].PRECIOT).toLocaleString("es-CL", {style: "currency", currency:"CLP"})}
                </p>
                  
                { ele[0].ESTADO_PAGO === "PAGADO"   && (
                     <BotonBoleta informacion ={ele} auth={auth} datos={datos}/>
                )}

              </div>
            ))
          : cargando ? '' : 'No hay pedidos'}

      </div>
    </div>
  );
};

export default Pedidos;
