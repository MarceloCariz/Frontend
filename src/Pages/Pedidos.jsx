import { faEye, faEyeSlash} from "@fortawesome/free-regular-svg-icons";
import { faClipboardList, faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { obtenerBoleta, obtenerPedidos, traerDatos } from "../Helpers/getClientes";
import useAuth from "../Hooks/useAuth";
import autoTable from "jspdf-autotable";
import { info } from "autoprefixer";



const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [datos, setDatos] = useState({});
  const [show, setShow] = useState(false);
  const { config,auth } = useAuth();
  const idPedido = useRef();
  useEffect(() => {
    const cargarPedidos = async () => {
      const resultado = await obtenerPedidos(config);
      const respuesta = await traerDatos(config);
      // resultado.map((ele,i)=>(console.log(ele.activos)))
      // console.log(resultado.sort())
      setPedidos(resultado.sort());
      setDatos(respuesta);
    };
    cargarPedidos();
    // pedidos.map((ele)=>{
    //   const pendientes = ele.filter((e)=>(e.ESTADO_ENVIO === 'pendiente' && e.ESTADO_ENVIO)).length
    //   console.log(pendientes)
    // })

  }, [config]);

  const onClick = (e) => {
    // console.log(e.i)
    idPedido.current.id = e.i;
    setShow(!show);
  };

  const  generarBoleta = async(e) =>{
    const doc = new jsPDF();
    console.log();
    var col = [["Nombre producto", "Cantidad", "Precio" ,]];
   
    info = []
   e.forEach((element,index,Array)  => {      
   info.push([element.NOMBRE_PRODUCTO,element.CANTIDAD,element.PRECIO])

   

});        
    // 1 - x 200  /////  2- y
   const id = (e[0].REFERENCIA_COMPRA);
    // return;
    const total = await obtenerBoleta(id);
    console.log(total);
    doc.setFontSize(20);
    doc.text(`fecha compra ${e[0].FECHA_COMPRA}`, 115, 207,);
    doc.text(`Total compra: $${total}`,115,215,);
    doc.text(`n°: ${e[0].REFERENCIA_COMPRA}`,130,40,);
    doc.text('Maipo Grande' ,15 ,10)
    doc.text('Contacto:' ,0 ,280)
    doc.text('http://www.maipogrande.ml' ,30 ,280)
    doc.rect(100, 200, 100, 20); 
    doc.rect(125, 5, 80, 40); 
    doc.rect(15, 23, 100, 50); 
    doc.text('R.U.T: 99.999.999-9' ,130 ,11)
    doc.text('Factura Electronica' ,130 ,25)
    doc.autoTable({
      columnStyles: { 0: { halign: 'center', } }, 
      margin: { top: 80 },
      head: col,
      body: info
   
     } );
  doc.setFontSize(15);
  doc.text(`señor : ${auth.NOMBRE}` ,16 ,30)
  doc.text(`Direccion :${e[0].DIRECCION}` ,16 ,40)
  doc.text(`Tipo venta : ${e[0].TIPO_VENTA}` ,16 ,50)
  doc.text(`Ciudad : ${datos.CIUDAD}` ,16 ,60)
  doc.text(`Correo : ${auth.CORREO}` ,16 ,70 )
    doc.save(`Boleta-${e[0].REFERENCIA_COMPRA}`);

  }

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
                      <div className="flex   sm:flex-col sm:gap-1 flex-col gap-1">
                        <p className="text-sm">Estado de envio{" "}</p> 
                        <p
                          className={
                            (ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente'))?
                              "bg-yellow-400 px-1 py-1 sm:h-10 rounded-lg   " :
                            
                              "bg-green-600")  
                          }
                        >
                            {ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente')) ? 'pendiente' : ele[0].ESTADO_ENVIO}
                        </p>
                        <p className="flex">
                         {ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente')) ? ele.filter((e)=>(e.ESTADO_ENVIO === 'pendiente' && e.ESTADO_ENVIO)).length + " pedidos" : ""}     
                        </p>
                        
                      </div>
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
                <p className="font-semibold sm:mt-4 ">
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
                  { ele[0].ESTADO_PAGO !== "RECHAZADO" && (
                      <button onClick={(e)=> generarBoleta(ele,e)} className="mt-2 px-4 py-2 bg-blue-500 text-white flex  items-center gap-2">
                      <FontAwesomeIcon  className="text-xl" icon={faFileArrowDown}  />
                      Descargar Boleta
                    </button>
                  )}

              </div>
            ))
          : "Aun no hay pedidos"}
      </div>
    </div>
  );
};

export default Pedidos;
