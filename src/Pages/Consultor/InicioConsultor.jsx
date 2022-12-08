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
import useConsultas from '../../Hooks/useConsultas';
// import { v4 as uuidv4 } from 'uuid';


const InicioConsultor  = () => {
  const [alerta, setAlerta] = useState('');
  const {datosGraficos:datos, cargarDatosGraficos} = useConsultas();
  useEffect(() => {

    cargarDatosGraficos();

  }, [ datos.length]);
  // console.log(datos)
  const  Tipocliente = async() =>{

    const fecha =new Date().toLocaleDateString();
    const doc = new jsPDF('p','mm','a4' );
    const datosventa = datos.tipoVenta

    var columntipoven = [["Tipo de venta", "Cantidad", ]];
    const datostipoven = datosventa.map((element,)  => (
    [element.TIPO_VENTA, element.CANTIDAD,]));    

  
      // 1 - x 200  /////  2- y
      doc.addImage(maipo, 'PNG', 2, 3,58,0, undefined, false);
      doc.setFontSize(20);
      doc.text(`Fecha de creacion: ${fecha}`, 110 , 11);
      doc.setFontSize(45);
      doc.text(`Tipos de ventas`,45, 65)
      doc.setFontSize(20);
      doc.text(`Hecho por: Consultor`,6, 21)
      doc.setFontSize(20);
      doc.text(`http://www.maipogrande.ml/`,9, 220)
      doc.rect(12, 50, 185, 20); 
      doc.autoTable({
        theme: 'striped',
            columnStyles: { 0: { halign: 'left',valign: 'middle' } }, 
            RowStyles: {0:{ halign: 'left',valign: 'middle' } }, 
            margin: { top: 75   },
            head: columntipoven,
            body: datostipoven
        
          });
            const blob = doc.output("blob");
         const pdfGenerado = new File([blob], `tipo_de_venta_${fecha.replace( new RegExp('/','g'), '_')}.pdf`, {type: 'application/pdf' } );
          const mensaje = await generarReporte({tipoVenta:datos.tipoVenta, pdfGenerado});
             setAlerta(mensaje);
      doc.save(`Tipo de ventas ${fecha}`);
      setTimeout(() => {
        setAlerta('');
      }, 2000);
    }

    const  Comprapormes = async() =>{
      const fecha =new Date().toLocaleDateString();
      const doc = new jsPDF('p','mm','a4' );
      const datoscomprames = datos.comprasPorMes
  
      var columncompra = [["compras", "mes ",]];
      const datoscompra = datoscomprames.map((element,)  => (
      [element.TOTAL_COMPRAS, element.MES,]));  
  
    
        // 1 - x 200  /////  2- y
        doc.addImage(maipo, 'PNG', 2, 3,58,0, undefined, false);
        doc.setFontSize(20);
        doc.text(`Fecha de creacion: ${fecha}`, 110 , 11);
        doc.setFontSize(45);
        doc.text(`Compra hechas por mes`,20, 65)
        doc.setFontSize(20);
        doc.text(`Hecho por: Consultor`,6, 21)
        doc.setFontSize(20);
        doc.text(`http://www.maipogrande.ml/`,9, 220)
      doc.rect(10, 50, 190, 20); 
      
        doc.autoTable({
          theme: 'striped',
              columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
              margin: { top: 80  },
              head: columncompra,
              body: datoscompra
            } );
             const blob = doc.output("blob");
             const pdfGenerado = new File([blob], `compra_por_mes_${fecha.replace( new RegExp('/','g'), '_')}.pdf`, {type: 'application/pdf' } );
             const mensaje = await generarReporte( {comprasPorMes:datos.comprasPorMes, pdfGenerado});
             setAlerta(mensaje);

        doc.save(`Compra por mes${fecha}`);
        setTimeout(() => {
          setAlerta('');
        }, 2000);
      }

      const  Estadopago = async() =>{

        const fecha =new Date().toLocaleDateString();
        const doc = new jsPDF('p','mm','a4' );
        const datosestadopago = datos.estadoPago
    
        var columnestado = [["Estado Pago", "Cantidad", ]];
        const datospago = datosestadopago.map((element,)  => (
        [element.ESTADO_PAGO, element.CANTIDAD,])); 
    
    
      
          // 1 - x 200  /////  2- y
          doc.addImage(maipo, 'PNG', 2, 3,58,0, undefined, false);
          doc.setFontSize(20);
          doc.text(`Fecha de creacion: ${fecha}`, 110 , 11);
          doc.setFontSize(45);
          doc.text(`Estado de compras`,35, 65)
          doc.setFontSize(20);
          doc.text(`Hecho por: Consultor`,6, 21)
          doc.setFontSize(20);
          doc.text(`http://www.maipogrande.ml/`,9, 220)
          doc.rect(12, 50, 185, 20); ; 
        
          doc.autoTable({
                theme: 'striped',
                columnStyles: { 0: { halign: 'left',valign: 'middle' } }, 
                margin: { top: 80  },
                head: columnestado,
                body: datospago
              } );
          const blob = doc.output("blob");
        const pdfGenerado = new File([blob], `estado_pedidos_${fecha.replace( new RegExp('/','g'), '_')}.pdf`, {type: 'application/pdf' } );
           const mensaje = await generarReporte({estadoPago: datos.estadoPago, pdfGenerado});
           setAlerta(mensaje);
          doc.save(`Estado de pedidos${fecha}`);
          setTimeout(() => {
            setAlerta('');
          }, 2000);
        }

  const  pdfdatosstock = async() =>{

    const fecha =new Date().toLocaleDateString();
    const doc = new jsPDF('p','mm','a4' );
    const datosStock = datos.stockProductosNombre
 
    const columnstock = [["Nombre producto", "total de producto",]];
    const datosStocktable = datosStock.map((element,)  => (
    [element.NOMBRE, element.TOTAL,]));   

      // 1 - x 200  /////  2- y
      doc.addImage(maipo, 'PNG', 2, 3,58,0, undefined, false);
      doc.setFontSize(20);
      doc.text(`Fecha de creacion: ${fecha}`, 110 , 11);
      doc.setFontSize(45);
      doc.text(`Productos disponibles`,30, 65)
      doc.setFontSize(20);
      doc.text(`Hecho por: Consultor`,6, 21)
      doc.setFontSize(20);
      doc.text(`http://www.maipogrande.ml/`,9, 220)
      doc.rect(12, 50, 185, 20); 
    
   
      doc.autoTable({
        theme: 'striped',
          columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
          margin: { top: 80  },
          head: columnstock,
          body: datosStocktable
        } );
           const blob = doc.output("blob");
          const pdfGenerado = new File([blob], `stock_productos_${fecha.replace( new RegExp('/','g'), '_')}.pdf`, {type: 'application/pdf' } );
     const mensaje = await generarReporte({stockProductosNombre: datos.stockProductosNombre, pdfGenerado});
           setAlerta(mensaje);
      doc.save(`stock_productos_${fecha}`);
      setTimeout(() => {
        setAlerta('');
      }, 2000);
    }

    const  Comprapordia = async() =>{

      const fecha =new Date().toLocaleDateString();
      const doc = new jsPDF('p','mm','a4' );
      const datoscomprapordia = datos.comprasPorDia
  
      var columndia = [["Estado Dias", "Total de compras", ]];
      const datocompra = datoscomprapordia.map((element,)  => (
      [element.DIA, element.TOTAL_COMPRAS,]));
  
  
    
        // 1 - x 200  /////  2- y
        doc.addImage(maipo, 'PNG', 2, 3,58,0, undefined, false);
        doc.setFontSize(20);
        doc.text(`Fecha de creacion: ${fecha}`, 110 , 11);
        doc.setFontSize(45);
        doc.text(`Compras por dia`,45, 65)
        doc.setFontSize(20);
        doc.text(`Hecho por: Consultor`,6, 21)
        doc.setFontSize(20);
        doc.text(`http://www.maipogrande.ml/`,9, 220)
        doc.rect(12, 50, 185, 20); 
      
        doc.autoTable({
          theme: 'striped',
            columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
            margin: { top: 80  },
            head: columndia,
            body: datocompra
          
            } );
             const blob = doc.output("blob");
             const pdfGenerado = new File([blob], `compras_por_dias_${fecha.replace( new RegExp('/','g'), '_')}.pdf`, {type: 'application/pdf' } );
             const mensaje = await generarReporte({comprasPorDia: datos.comprasPorDia, pdfGenerado});
             setAlerta(mensaje);
        doc.save(`compras por dias${fecha}`);
        setTimeout(() => {
          setAlerta('');
        }, 2000);
      }

  const  generarReportePdf = async() =>{

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
      doc.addImage(maipo, 'PNG', 2, 3,58,0, undefined, false);
      doc.setFontSize(20);
      doc.text(`Fecha de creacion: ${fecha}`, 200 , 11);
      doc.setFontSize(45);
      doc.text(`Reporte General`,65, 65)
      doc.setFontSize(20);
      doc.text(`Hecho por: Consultor`,6, 21)
      doc.setFontSize(20);
      doc.text(`http://www.maipogrande.ml/`,15, 220)
      doc.rect(50, 50, 185, 20); 
    
   
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
      // console.log(fecha.replace( new RegExp('/','g'), '_'));
      // return;
      // console.log(blob)
     //  const blob = doc.output("blob");
     //  const pdfGenerado = new File([blob], `reporte_general_${fecha.replace( new RegExp('/','g'), '_')}.pdf`, {type: 'application/pdf' } );
      // const pdfGenerado = new File([blob], `${uuidv4()}.pdf`, {type: 'application/pdf' } );

      // console.log(pdfGenerado);
     //  const mensaje = await generarReporte({...datos, pdfGenerado});
      // setAlerta(mensaje);
      doc.save(`reporte_general_${fecha}`);
      setTimeout(() => {
        setAlerta('');
      }, 2000);
    }
    
  

  return (
    <div className='mb-20 flex flex-col  justify-center items-center'  >
      <h3 className='text-center font-semibold text-4xl '>
        <FontAwesomeIcon className='pr-2' icon={faChartSimple}/>
        Gráficos</h3>
      {alerta && 
      <div className='flex justify-center mt-2'>
          <p className='px-4 py-2 bg-green-500 text-white text-center w-auto rounded-md'>{alerta}</p>
      </div>
      }
      <div className='bg-white w-full mt-4 shadow-inner rounded-md'>
              <div className='flex justify-center sm:justify-center pt-4'>
              <button onClick={generarReportePdf} className='px-4 py-2 bg-blue-500 text-white text-xl mt-2 flex items-center gap-1 rounded-md inset-x-100'>
                <FontAwesomeIcon icon={faDownload}/>
                Generar Reporte General</button>
              </div>

              <div className='mt-2 px-4 lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:justify-items-center md:gap-12 lg:gap-0 flex flex-col gap-12   pt-12 pb-12'>

                <div className='  sm:w-2/4 sm:justify-self-center sm:self-center bg-white py-4 px-4 rounded-md'>
                  <h2 className='text-center'>Compras por Tipo cliente</h2>
                    <GraficoPie tipoVenta={datos.tipoVenta}/>
                    <div className=' justify-center  flex'>
                      <button onClick={Tipocliente} className='px-4 py-2 bg-blue-500 text-white text-xl mt-2 flex items-center gap-1 rounded-md inset-x-100'>
                        <FontAwesomeIcon icon={faDownload}/>
                        Generar Tipo cliente</button>
                    </div>
                </div>

                {/* CONTENEDOR DE 4 GRAFICOS */}
                <div className='w-full   lg:grid lg:grid-cols-2  lg:grid-rows-2 2xl:gap-12   md:gap-12  flex flex-col gap-12'>

                    <div className=' w-full  py-4 px-4 rounded-md '>
                      <h2 className='text-center'>Compras por Mes</h2>
                        <GraficoArea comprasPorMes={datos.comprasPorMes}/>
                        <div className=' justify-center  flex '>
                          <button onClick={Comprapormes} className='px-4 py-2 bg-blue-500 text-white  xl:text-md 2xl:text-lg  mt-2 flex items-center gap-1 rounded-md '>
                            <FontAwesomeIcon icon={faDownload}/>
                            Generar Compra por mes</button>
                        </div>
                    </div>

                    <div className='  w-full   '>
                      <h2 className='text-center'>Estados de Pagos</h2>
                      <GraficoEstadoPago estadoPago={datos.estadoPago}/>
                      <div className=' justify-center  flex  '>
                        <button onClick={Estadopago} className='px-4 py-2 bg-blue-500 text-white xl:text-md 2xl:text-lg mt-2 flex items-center gap-1 rounded-md '>
                          <FontAwesomeIcon icon={faDownload}/>
                          Generar Estado de Pago</button>
                      </div>
                    </div>

                      <div className=' w-full  '>
                        <h2 className='text-center'>Cantidad de productos disponibles</h2>
                        <GraficoStockProducto stockProductosNombre={datos.stockProductosNombre}/>
                        <div className=' justify-center  flex    '>
                          <button onClick={pdfdatosstock} className='px-4 py-2 bg-blue-500 text-white xl:text-md 2xl:text-lg mt-2 flex items-center gap-1 rounded-md '>
                            <FontAwesomeIcon icon={faDownload}/>
                            Generar Productos disponibles</button>
                        </div>
                      </div>

                    <div className='  w-full   '>
                      <h2 className='text-center'>Compras Por Día</h2>
                      <GraficoVentasDia comprasPorDia={datos.comprasPorDia}/>
                      <div className=' justify-center  flex    '>
                        <button onClick={Comprapordia} className='px-4 py-2 bg-blue-500 text-white xl:text-md 2xl:text-lg mt-2 flex items-center gap-1 rounded-md '>
                          <FontAwesomeIcon icon={faDownload}/>
                          Generar Compras por dia</button>
                      </div>
                    </div>
                </div>
                
                
              </div>
      </div>
      
    </div>
  )
}

export default InicioConsultor