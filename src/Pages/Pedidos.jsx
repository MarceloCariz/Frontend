import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { obtenerPedidos } from "../Helpers/getClientes";
import useAuth from "../Hooks/useAuth";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [show, setShow] = useState(false);
  const { config } = useAuth();
  const idPedido = useRef();
  useEffect(() => {
    const cargarPedidos = async () => {
      const resultado = await obtenerPedidos(config);
      // resultado.map((ele,i)=>(console.log(ele.activos)))
      // console.log(resultado.sort())
      setPedidos(resultado.sort());
    };
    cargarPedidos();

  }, [config]);

  const onClick = (e) => {
    // console.log(e.i)
    idPedido.current.id = e.i;
    setShow(!show);
  };
  return (
    <div className="">
      <p className="sm:text-3xl text-2xl text-center font-semibold">
        <FontAwesomeIcon className="mr-2" icon={faClipboardList}/>
        Pedidos
      </p>
      <div className="flex justify-center flex-col items-center mx-auto pt-12">
        {pedidos.length > 0
          ? pedidos.map((ele, i) => (
              <div key={ele[0].REFERENCIA_COMPRA} className="sm:w-2/5 flex flex-col text-left justify-center items-center mb-4 rounded-lg bg-white shadow-xl px-4 py-4">
                <div className="flex gap-2 sm:text-xl capitalize font-semibold items-center ">
                  <p>
                    Numero pedido{" "}
                    <span className="text-black font-bold">#{ele[0].REFERENCIA_COMPRA}</span>{" "}
                  </p>

                  <div
                    className={
                      ele[0].ESTADO_PAGO === "RECHAZADO"
                        ? "bg-red-600 px-2 py-2 rounded-lg capitalize text-white"
                        : "bg-green-600  text-white px-2 py-2 rounded-lg capitalize"
                    }
                  >
                    {ele[0].ESTADO_PAGO === "RECHAZADO" ? (
                      "Estado de envio: CANCELADO"
                    ) : (
                      <p className="flex   sm:flex-row sm:gap-0 flex-col gap-1">
                        Estado de envio:{" "}
                        <span
                          className={
                            (ele[0].ESTADO_ENVIO === "pendiente" &&
                              "bg-yellow-400 px-1 py-1 sm:h-10 rounded-lg ") ||
                            (ele[0].ESTADO_ENVIO === "asignado" &&
                              "bg-green-600")
                          }
                        >
                      {ele[0].ESTADO_ENVIO}
                            
                        </span>
                      </p>
                    )}
                  </div>

                  <p
                    className={
                      ele[0].ESTADO_PAGO === "RECHAZADO"
                        ? "bg-red-600 px-2 py-2 rounded-lg capitalize text-white"
                        : "bg-green-600  text-white px-2 py-2 rounded-lg capitalize"
                    }
                  >{`Estado de pago: ${ele[0].ESTADO_PAGO}`}</p>

                  <button
                    className="ml-4"
                    ref={idPedido}
                    id={i}
                    onClick={(e) => onClick({ i }, e)}
                  >
                    {show && Number(idPedido.current.id) === i ? (
                      <p className="text-lg ">
                        <FontAwesomeIcon
                          className="text-2xl transition ease-in duration-300  hover:-translate-y-1"
                          icon={faEye}
                        />
                        Cerrar
                      </p>
                    ) : (
                      <p className="text-lg">
                        <FontAwesomeIcon
                          className="text-2xl transition ease-in duration-300  hover:-translate-y-1"
                          icon={faEyeSlash}
                        />
                        Ver
                      </p>
                    )}
                  </button>
                </div>
                <p className="font-semibold sm:ml-40 ">
                  Fecha de compra: {ele[0].FECHA_COMPRA}
                </p>

                {show &&
                  Number(idPedido.current.id) === i &&
                 ( <div className="flex gap-12 mt-4  sm:ml-16 animate__animated animate__fadeIn ">
                   <table className="flex flex-col gap-2 table-auto ">
                   <thead >
                          <tr className="flex text-xl  justify-between gap-12  text-center    items-center">
                            <th className="">Nombre Producto </th>
                            <th className="">Cantidad </th>
                            <th>Estado</th>
                            {/* <th>Fecha Compra </th> */}
                          </tr>
                    </thead>
                    {ele.map((e, i) => (

                        <tbody key={i}>
                          <tr className="flex capitalize sm:gap-32 justify-between sm:justify-start  sm:text-rigth   items-center text-sm">
                            <th className="w-32">{e.NOMBRE_PRODUCTO}</th>
                            <th >{e.CANTIDAD} kg</th>
                            <th>{e.ESTADO_ENVIO}</th>
                          </tr>
                        </tbody>
                      ))}
                      </table>
                    </div>

                  )}
              </div>
            ))
          : "Aun no hay pedidos"}
      </div>
    </div>
  );
};

export default Pedidos;
