import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react'
import {  useLocation} from 'react-router-dom'
import { validarPedido } from '../Helpers/getClientes';

const Pago = () => {
  const location = useLocation();
  const token =  location.search.replace('?token_ws=', '') ;

  const [voucherF, setVoucher] = useState({});
  const {vci, amount, status, session_id,transaction_date} = voucherF; 
  useEffect(() => {
    const validar = async()=>{
        const respuesta = await validarPedido(token);
        setVoucher(respuesta)
        // console.log(respuesta)
    };
    // return
    validar();
    // console.log(voucherF.map((v)=>(console.log(v))))
  }, [token])
  // console.log(voucherF.map((v)=>(console.log(v))))
  
  const  generarVoucher = () =>{
    const doc = new jsPDF();
    // 1 - x 200  /////  2- y
    doc.text('MAIPOGRANDE',10, 10);
    doc.text(`Boleta #${session_id}`, 150, 10);
    doc.text(`Monto Pagado: ${amount}`, 50, 40 );
    doc.text(`Id sesion: ${session_id}`, 50, 50);
    doc.text(`Fecha Compra: ${transaction_date}`, 50, 60);

    doc.save(`Boleta-${session_id}`);
  }

  return (
    <div className='flex justify-center text-center items-center flex-col gap-8 container mx-auto pt-12'>
       <h2 className='text-xl'>Comprobante de pago</h2>
        <div >
        {voucherF.vci ?
            <div className='text-left flex flex-col gap-4 '>
              <p>{vci}</p>
              <p>Estado: {status}</p>
              <p>Monto Pagado: {amount}</p>
              <p>Numero de sesion: {session_id}</p>
              <p>Fecha de transaccion: {transaction_date}</p>
              <div className='flex items-center justify-center mt-12'>
                <button onClick={generarVoucher} className='px-4 py-2 bg-blue-500 text-white'>Descargar</button>
              </div>
            </div>
         :'...cargando'

        }
      
        </div>
    </div>
  )
}

export default Pago