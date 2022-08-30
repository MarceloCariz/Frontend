

import  { useEffect, useState } from 'react'

const useTime = (finalHora, socket, activo, auth) => {
  const [hora, setHora] = useState('')
  const [minutos, setMinutos] = useState({time:null, estado: false})
  const [resultado, setResultado] = useState([])
    
    useEffect(() => {
        const cargarHora = ()=>{
          const horaActual = new Date();
          setHora(horaActual.toLocaleTimeString())
            if(finalHora - horaActual > 0){
              const minutosF = (finalHora  - horaActual)/(1000*60)
              setMinutos({...minutos, time: minutosF})
            }
         
       
        }
        console.log(minutos.time)
        if(minutos.time !== null && minutos.time.toFixed(1) <= 0.0 ){
          setMinutos({time: null,estado: true});
          console.log('stop')
          socket.emit('subasta:finalizar',true)
          socket.on('client-subasta', (data)=>{
            const seleccionados = data.filter(({ID_PRODUCTOR})=>(
                ID_PRODUCTOR === auth.ID
            ))
          setResultado(seleccionados)
          })
          activo = false
          return
       }
       
       if( minutos.estado === true ){
          activo = false
         return
       } 
    
          setTimeout(()=>{
            cargarHora();
          },2000)
    
    
      }, [hora])

      return {minutos: minutos.time, hora, resultado}
}

export default useTime