import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react'
import {  useLocation} from 'react-router-dom'
import { validarPedido } from '../Helpers/getClientes';
import maipo from '../Components/clients/img/maipo.PNG';
import timbre from '../Components/clients/img/timbre.jpg';
import autoTable from "jspdf-autotable";
const Pago = () => {
  const location = useLocation();
  const tokenTBK = location.search.substring(0,11) === '?TBK_TOKEN=' ? location.search.replace('?TBK_TOKEN=', '').substring(0,64) :location.search.replace('?token_ws=','') ;
  // const token = location.search.replace('?token_ws=','');
  const [voucherF, setVoucher] = useState({});
  // console.log(tokenTBK.substring(0,64));
  // console.log(location.search.substring(0,11) === '?TBK_TOKEN=')

  useEffect(() => {

    const validar = async()=>{
        const respuesta = await validarPedido(tokenTBK);
        setVoucher(respuesta)
      };
    // return
    validar();
    // console.log(voucherF.map((v)=>(console.log(v))))
  }, [])
  // console.log(voucherF.map((v)=>(console.log(v))))
  const {vci, amount, status, session_id,transaction_date} = voucherF; 
  
  const  generarVoucher = () =>{
    const doc = new jsPDF('p','mm','a5' );
    // 1 - x 200  /////  2- y
    doc.setFontSize(14);
        doc.text(`Fecha de Compra:${transaction_date} `, 45, 75);
        doc.text(`precio total pagado:${amount}`, 5, 85);
        doc.text(`${vci} `, 45, 95);
        doc.text(`Estado:${status} `, 45, 105);
        doc.addImage(maipo, 'PNG', 30, 45,80,0, undefined, false);
        doc.addImage(timbre, 'JPG',10, 140,130,0,undefined,false);
        doc.rect(30, 5, 90, 30); 
        doc.setFontSize(18);
        doc.text(`Rut: 99.999.999-9`, 35, 15);
        doc.text(`Boleta electronica:${session_id} `, 35, 30);
        
        

    doc.save(`Boleta-${session_id}`);
  }
  return (
    <div className='flex justify-center text-center items-center flex-col gap-8 container mx-auto pt-12'>
       <h2 className='text-xl'>Comprobante de pago</h2>
        <div >
        {voucherF.status ?
            <div className='text-left flex flex-col gap-4 '>
              <p>{vci}</p>
              <p>Estado: {status === 'INITIALIZED' || status === 'FAILED' ? 'ANULADO' : status}</p>
              <p>Monto Pagado: {amount}</p>
              <p>Numero de sesion: {session_id}</p>
              <p>Fecha de transaccion: {transaction_date}</p>
              {status === 'INITIALIZED' || status === 'FAILED'  ?(
                <div className='text-center bg-red-500 px-4 py-2 text-white'>
                  <p>Pedido Cancelado</p>
                </div>
              ): 
              <div className='flex items-center justify-center mt-12'>
                  <button onClick={generarVoucher} className='px-4 py-2 bg-blue-500 text-white'>Descargar</button>
              </div>
              }

            </div>
         :'...cargando'

        }
      
        </div>
    </div>
  )
}

export default Pago