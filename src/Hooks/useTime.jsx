

import  { useEffect, useState } from 'react'

const useTime = (finalHora, socket,  auth, referenciaCompra,NOMBRE_PRODUCTO) => {
  const [hora, setHora] = useState('')
  const [minutos, setMinutos] = useState({time:null, estado: false})
  const [resultado, setResultado] = useState({idcompra: 0, mensaje: '',nombre_producto: ''});

   

    useEffect(() => {
        if(referenciaCompra === null) return
        const cargarHora = ()=>{
          const horaActual = new Date();
          setHora(horaActual.toLocaleTimeString())
            if(finalHora - horaActual > 0){
              const minutosF = (finalHora  - horaActual)/(1000*60)
              setMinutos({...minutos, time: minutosF})
            }
         
       
        }
        // if(minutos.time !== null && minutos.time.toFixed(1) <= 0.0 ){
        if(new Date(finalHora).getTime() - new Date().getTime() < 0){

          setMinutos({time: null,estado: true});
          console.log('stop')
          socket.emit('subasta:finalizar',true,referenciaCompra,NOMBRE_PRODUCTO,auth.ID)
          socket.on('client-subasta', (mensaje, id, idcompra, nombre_product)=>{
            if(id === auth.ID){
              setResultado({idcompra: idcompra, mensaje: mensaje, nombre_producto: nombre_product});

            }
          })
          return
       }
       
       if(resultado.length > 0 ){
         return
       } 
    
          setTimeout(()=>{
            cargarHora();
          },2000)
    
    
      }, [hora, referenciaCompra])

      return {minutos: minutos.time, hora, resultado}
}

export default useTime