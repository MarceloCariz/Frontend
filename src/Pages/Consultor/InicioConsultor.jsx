import React, { useEffect,  useState } from 'react'
import { GraficoArea } from '../../Components/consultor/GraficoArea'
import { GraficoEstadoPago } from '../../Components/consultor/GraficoEstadoPago'
import { GraficoPie } from '../../Components/consultor/GraficoPie'
import { generarReporte } from '../../Helpers/getConsultor'
import GraficoStockProducto from '../../Components/consultor/GraficoStockProducto'
import GraficoVentasDia from '../../Components/consultor/GraficoVentasDia'
import jsPDF from 'jspdf';
import maipo from '../../Components/clients/img/maipo.PNG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faChartSimple, faDownload } from '@fortawesome/free-solid-svg-icons'
import useConsultas from '../../Hooks/useConsultas'
const InicioConsultor  = () => {
  const [alerta, setAlerta] = useState('');
  const {datosGraficos:datos, cargarDatosGraficos} = useConsultas();
  useEffect(() => {


    cargarDatosGraficos();

  }, [ datos.length]);
  // console.log(datos)
  const  Tipocliente = async() =>{
    const mensaje = await generarReporte(datos);
    setAlerta(mensaje);
    const fecha =new Date().toLocaleDateString();
    const doc = new jsPDF('p','mm','a4' );
    const datosventa = datos.tipoVenta

    var columntipoven = [["Tipo de venta", "Cantidad", ]];
    const datostipoven = datosventa.map((element,)  => (
    [element.TIPO_VENTA, element.CANTIDAD,]));    

  
      // 1 - x 200  /////  2- y
      doc.addImage(maipo, 'PNG', 0, 0,50,0, undefined, false);
      doc.text(`Fecha de creacion: ${fecha}`, 130, 7).setFontSize(25);
      doc.setFontSize(30);
      doc.text(`Tipo de venta`,60, 65).setFontSize(10);
    
      doc.autoTable({
        theme: 'striped',
           columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
           margin: { top: 75  },
           head: columntipoven,
           body: datostipoven
        
          } );

      doc.save(`Tipo de ventas ${fecha}`);
      setTimeout(() => {
        setAlerta('');
      }, 2000);
    }

    const  Comprapormes = async() =>{
      const mensaje = await generarReporte(datos);
      setAlerta(mensaje);
      const fecha =new Date().toLocaleDateString();
      const doc = new jsPDF('p','mm','a4' );
      const datoscomprames = datos.comprasPorMes
  
      var columncompra = [["compras", "mes ",]];
      const datoscompra = datoscomprames.map((element,)  => (
      [element.TOTAL_COMPRAS, element.MES,]));  
  
    
        // 1 - x 200  /////  2- y
        doc.addImage(maipo, 'PNG', 0, 0,50,0, undefined, false);
        doc.text(`Fecha de creacion: ${fecha}`, 130, 7).setFontSize(25);
        doc.setFontSize(30);
        doc.text(`Compra hecha por mes`,50, 65).setFontSize(10);
      
        doc.autoTable({
          theme: 'striped',
             columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
             margin: { top: 80  },
             head: columncompra,
             body: datoscompra
            } );
  
        doc.save(`Compra por mes${fecha}`);
        setTimeout(() => {
          setAlerta('');
        }, 2000);
      }

      const  Estadopago = async() =>{
        const mensaje = await generarReporte(datos);
        setAlerta(mensaje);
        const fecha =new Date().toLocaleDateString();
        const doc = new jsPDF('p','mm','a4' );
        const datosestadopago = datos.estadoPago
    
        var columnestado = [["Estado Pago", "Cantidad", ]];
        const datospago = datosestadopago.map((element,)  => (
        [element.ESTADO_PAGO, element.CANTIDAD,])); 
    
    
      
          // 1 - x 200  /////  2- y
          doc.addImage(maipo, 'PNG', 0, 0,50,0, undefined, false);
          doc.text(`Fecha de creacion: ${fecha}`, 130, 7).setFontSize(25);
          doc.setFontSize(30);
          doc.text(`Estado de pedidos`,50, 65).setFontSize(10);
        
          doc.autoTable({
            theme: 'striped',
               columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
               margin: { top: 70  },
               head: columnestado,
               body: datospago
            
              } );
    
          doc.save(`Estado de pedidos${fecha}`);
          setTimeout(() => {
            setAlerta('');
          }, 2000);
        }

  const  pdfdatosstock = async() =>{
    const mensaje = await generarReporte(datos);
    setAlerta(mensaje);
    const fecha =new Date().toLocaleDateString();
    const doc = new jsPDF('p','mm','a4' );
    const datosStock = datos.stockProductosNombre
 
     var columnstock = [["Nombre producto", "total de producto",]];
    const datosStocktable = datosStock.map((element,)  => (
    [element.NOMBRE, element.TOTAL,]));   

      // 1 - x 200  /////  2- y
      doc.addImage(maipo, 'PNG', 0, 0,50,0, undefined, false);
      doc.text(`Fecha de creacion: ${fecha}`, 130, 7).setFontSize(25);
      doc.setFontSize(30);
      doc.text(`Stock Disponible`,55, 45).setFontSize(10);
    
   
      doc.autoTable({
        theme: 'striped',
           columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
           margin: { top: 50  },
           head: columnstock,
           body: datosStocktable
          } );
      doc.save(`Venta de productos ${fecha}`);
      setTimeout(() => {
        setAlerta('');
      }, 2000);
    }

    const  Comprapordia = async() =>{
      const mensaje = await generarReporte(datos);
      setAlerta(mensaje);
      const fecha =new Date().toLocaleDateString();
      const doc = new jsPDF('p','mm','a4' );
      const datoscomprapordia = datos.comprasPorDia
  
      var columndia = [["Estado Dias", "Total de compras", ]];
      const datocompra = datoscomprapordia.map((element,)  => (
      [element.DIA, element.TOTAL_COMPRAS,]));
  
  
    
        // 1 - x 200  /////  2- y
        doc.addImage(maipo, 'PNG', 0, 0,50,0, undefined, false);
        doc.text(`Fecha de creacion: ${fecha}`, 130, 7).setFontSize(25);
        doc.setFontSize(30);
        doc.text(`Compras por dias`,50, 65).setFontSize(10);
      
        doc.autoTable({
          theme: 'striped',
             columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
             margin: { top: 70  },
             head: columndia,
             body: datocompra
          
            } );
  
        doc.save(`Compras por dias${fecha}`);
        setTimeout(() => {
          setAlerta('');
        }, 2000);
      }

  const  generarReportePdf = async() =>{
    const mensaje = await generarReporte(datos);
    setAlerta(mensaje);
    const fecha =new Date().toLocaleDateString();
    const doc = new jsPDF('p','mm','a3' );
    const datosStock = datos.stockProductosNombre
    const datoscomprames = datos.comprasPorMes
    const datosestadopago = datos.estadoPago
    const datoscomprapordia = datos.comprasPorDia
    const datosventa = datos.tipoVenta

    var columnstock = [["Nombre producto", "total de producto",]];
    const datosStocktable = datosStock.map((element,)  => (
    [element.NOMBRE, element.TOTAL,]));    

    var columncompra = [["compras", "mes ",]];
    const datoscompra = datoscomprames.map((element,)  => (
    [element.TOTAL_COMPRAS, element.MES,]));  

    var columnestado = [["Estado Pago", "Cantidad", ]];
    const datospago = datosestadopago.map((element,)  => (
    [element.ESTADO_PAGO, element.CANTIDAD,])); 

    var columndia = [["Estado Dias", "Total de compras", ]];
    const datocompra = datoscomprapordia.map((element,)  => (
    [element.DIA, element.TOTAL_COMPRAS,]));

    var columntipoven = [["Tipo de venta", "Cantidad", ]];
    const datostipoven = datosventa.map((element,)  => (
    [element.TIPO_VENTA, element.CANTIDAD,]));  
    // info.push([ ...element])});      
      // 1 - x 200  /////  2- y
      doc.addImage(maipo, 'PNG', 0, 0,100,0, undefined, false);
      doc.text(`Fecha de creacion: ${fecha}`, 200, 10).setFontSize(10);
      doc.setFontSize(50);
      doc.text(`Reporte General`,80, 50).setFontSize(50);
    
   
      doc.autoTable({
        theme: 'striped',
           columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
           margin: { top: 75  },
           head: columntipoven,
           body: datostipoven
        
          } );

          doc.autoTable({
            theme: 'striped',
               columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
               margin: { top: 20  },
               head: columnestado,
               body: datospago
            
              } );

          doc.autoTable({
            theme: 'striped',
               columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
               margin: { top: 30  },
               head: columndia,
               body: datocompra
            
              } );

                doc.autoTable({
                  theme: 'striped',
                     columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
                     margin: { top: 40  },
                     head: columncompra,
                     body: datoscompra
                    } );

          doc.autoTable({
            theme: 'striped',
               columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
               margin: { top: 50  },
               head: columnstock,
               body: datosStocktable
            
              } );
             

       
      doc.save(`Reporte de venta ${fecha}`);
      setTimeout(() => {
        setAlerta('');
      }, 2000);
    }
    
  

  return (
    <div >
      <h3 className='text-center font-semibold text-4xl '>
        <FontAwesomeIcon className='pr-2' icon={faChartSimple}/>
        Gráficos</h3>
      {alerta && 
      <div className='flex justify-center mt-2'>
          <p className='px-4 py-2 bg-green-500 text-white text-center w-1/2'>{alerta}</p>
      </div>
      }
     
      <div className='flex justify-center sm:justify-end '>
      <button onClick={generarReportePdf} className='px-4 py-2 bg-blue-500 text-white text-xl mt-2 flex items-center gap-1 rounded-md inset-x-100'>
        <FontAwesomeIcon icon={faDownload}/>
        Generar Reporte General</button>
      </div>

      <div className='sm:grid sm:grid-cols-3 sm:justify-items-center sm:gap-12 flex flex-col gap-10  pt-12 sm:min-w-full '>

        <div className='  sm:w-2/3 '>
          <h2 className='text-center'>Compras por Tipo cliente</h2>
            <GraficoPie tipoVenta={datos.tipoVenta}/>
            <div className=' justify-center sm:justify-end absolute inset-x-80 bottom-100 h-16'>
      <button onClick={Tipocliente} className='px-4 py-2 bg-blue-500 text-white text-xl mt-2 flex items-center gap-1 rounded-md inset-x-100'>
        <FontAwesomeIcon icon={faDownload}/>
        Generar Tipo cliente</button>
      </div>
        </div>

        <div className='w-full h-full'>
          <h2 className='text-center'>Compras por Mes</h2>
            <GraficoArea comprasPorMes={datos.comprasPorMes}/>
            <div className=' justify-center sm:justify-end absolute inset-x-170 bottom-70 h-11'>
      <button onClick={Comprapormes} className='px-4 py-2 bg-blue-500 text-white text-xl mt-2 flex items-center gap-1 rounded-md inset-x-100'>
        <FontAwesomeIcon icon={faDownload}/>
        Generar Compra por mes</button>
        </div>
        </div>

        <div className='  w-full   '>
          <h2 className='text-center'>Estados de Pagos</h2>
          <GraficoEstadoPago estadoPago={datos.estadoPago}/>
          <div className=' justify-center sm:justify-end absolute  h-16'>
      <button onClick={Estadopago} className='px-4 py-2 bg-blue-500 text-white text-xl mt-2 flex items-center gap-1 rounded-md inset-x-100'>
        <FontAwesomeIcon icon={faDownload}/>
        Generar Estado Pago</button>
      </div>
        </div>
        <div className=' w-full '>
          <h2 className='text-center'>Cantidad de productos disponibles</h2>
          <GraficoStockProducto stockProductosNombre={datos.stockProductosNombre}/>
          <div className=' justify-center sm:justify-end absolute   top-50 h-12'>
      <button onClick={pdfdatosstock} className='px-4 py-2 bg-blue-500 text-white text-xl mt-2 flex items-center gap-1 rounded-md inset-x-100'>
        <FontAwesomeIcon icon={faDownload}/>
        Generar Productos disponibles</button>
      </div>
        </div>

        <div className='  w-full   '>
          <h2 className='text-center'>Compras Por Día</h2>
          <GraficoVentasDia comprasPorDia={datos.comprasPorDia}/>
          <div className=' justify-center sm:justify-end absolute   top-50 h-12'>
      <button onClick={Comprapordia} className='px-4 py-2 bg-blue-500 text-white text-xl mt-2 flex items-center gap-1 rounded-md inset-x-100'>
        <FontAwesomeIcon icon={faDownload}/>
        Generar Compras por dia</button>
      </div>
        </div>
        {/* <div className='  w-full   '>
          <h2 className='text-center'>Estados de Pagos</h2>
          <GraficoEstadoPago estadoPago={datos.estadoPago}/>


        </div> */}
        
      </div>
    </div>
  )
}

export default InicioConsultor