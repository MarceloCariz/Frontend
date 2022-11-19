import React, { useRef, useState } from 'react'
import { BotonBoleta } from './BotonBoleta'
import { BotonPagarExt } from './BotonPagarExt'
import { BotonRecibido } from './BotonRecibido'
import { Cabecera } from './Cabecera'
import { InformacionPedido } from './InformacionPedido'

export const CardPedido = ({ele,i, config, auth, datos}) => {
  const [show, setShow] = useState(false);

  const idPedido = useRef();

    const onClick = (e) => {
        // console.log(e.i)
    
        idPedido.current.id = e.i;
        setShow(!show);
      };
  return (
    <div key={ele[0].REFERENCIA_COMPRA} className=" 2xl:w-3/6 lg:w-4/6 lg:mx-0 md:mx-12 flex flex-col text-left justify-center items-center mb-4 rounded-lg bg-white shadow-xl px-4 py-4">
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

                <p className="text-xl font-semibold ">{ele[0].ESTADO_PAGO === 'PAGADO' ? 'Total Pagado: ' : ele[0].ESTADO_PAGO === 'pendiente' ? "Total a pagar: " : ""}
                  {ele[0].ESTADO_PAGO === 'PAGADO' || ele[0].ESTADO_PAGO === 'pendiente' ?  ele.reduce((total, i)=>((Number(i.PRECIO) * Number(i.CANTIDAD)  ) + total) ,ele[0].PRECIOT).toLocaleString("es-CL", {style: "currency", currency:"CLP"}) : "Rechazado"}
                </p>
                  
                { ele[0].ESTADO_PAGO === "PAGADO"   && (
                    <BotonBoleta informacion ={ele} auth={auth} datos={datos}/>
                )}

              </div>
  )
}
