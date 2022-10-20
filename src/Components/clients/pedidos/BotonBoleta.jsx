import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import jsPDF from 'jspdf'
import { info } from "autoprefixer";
import autoTable from "jspdf-autotable";
import { obtenerBoleta } from '../../../Helpers/getClientes';
import maipo from '../img/maipo.PNG';
import timbre from '../img/timbre.jpg';
export const BotonBoleta = ({informacion, auth, datos}) => {

const  generarBoleta = async() =>{
        const e = informacion;
        const doc = new jsPDF('p', 'mm', 'a4');
        doc.page=0;
        console.log(datos);
        var col = [["Nombre producto", "Cantidad", "Precio unidad","Precio total"]];
       
        info = []
        e.forEach((element,index,Array)  => {    
       info.push([ element.NOMBRE_PRODUCTO, element.CANTIDAD, element.PRECIO, element.PRECIO * element.CANTIDAD])});        
        // 1 - x 200  /////  2- y
       const id = (e[0].REFERENCIA_COMPRA);
        // return;
        const total = await obtenerBoleta(id);
        console.log(total);
        doc.setFontSize(13);
        doc.text(`fecha compra ${e[0].FECHA_COMPRA}`, 115, 207,);
        doc.text(`Total compra: $${total}`,115,215,);
        doc.addImage(maipo, 'PNG', 10, 13, undefined, false);
        doc.addImage(timbre, 'JPG', 0, 190, undefined, false);
        doc.text('Contacto:' ,0 ,280)
        doc.text('http://www.maipogrande.ml' ,30 ,280)
        doc.rect(100, 200, 100, 20); 
        doc.rect(15, 25, 80, 60); 
        doc.setTextColor(255, 0, 0);
        doc.text('R.U.T: 99.999.999-9' ,130 ,35)
        doc.text('Factura Electronica' ,130 ,48)
        doc.text(`n°: ${e[0].REFERENCIA_COMPRA}`,130,60 ,);
        doc.setDrawColor(255, 0, 0);
        doc.rect(125, 25, 70, 40); 
        doc.autoTable({
       theme: 'grid',
          columnStyles: { 0: { halign: 'center', } }, 
          margin: { top: 90 },
          head: col,
          body: info
       
         } );
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`señor : ${auth.NOMBRE}` ,16 ,30)
      doc.text(`Direccion :${e[0].DIRECCION}` ,16 ,50)
      doc.text(`Tipo venta : ${e[0].TIPO_VENTA}` ,16 ,80)
      doc.text(`Ciudad : ${datos.CIUDAD}` ,16 ,60)
      doc.text(`Correo : ${auth.CORREO}` ,16 ,70 )
      doc.text(`Rut : ${auth.RUT}` ,16 ,40 )
        doc.save(`Factura-${e[0].REFERENCIA_COMPRA}`);
    
      }
  return (
    <button onClick={generarBoleta} className="mt-2 px-4 py-2 bg-blue-500 text-white flex  items-center gap-2">
    <FontAwesomeIcon  className="text-xl" icon={faFileArrowDown}  />
    Descargar Factura
    </button>
  
  )
}
