import { useEffect, useState } from "react";

const useTimeT = (finalHora, socket, auth, referenciaCompra, cantidad) => {
    const [hora, setHora] = useState("");
    const [minutos, setMinutos] = useState({ time: null, estado: false });
    const [resultado, setResultado] = useState([]);

useEffect(() => {
    if (referenciaCompra === null) return;
    const cargarHora = () => {
        const horaActual = new Date();
        setHora(horaActual.toLocaleTimeString());
        if (finalHora - horaActual > 0) {
            const minutosF = (finalHora - horaActual) / (1000 * 60);
            console.log(minutosF);
            setMinutos({ ...minutos, time: minutosF });
    }
    };
    // if(minutos.time !== null && minutos.time.toFixed(1) <= 0.0 ){
    if (new Date(finalHora).getTime() - new Date().getTime() < 0) {
        setMinutos({ time: null, estado: true });
        socket.emit("finalizarT", true, referenciaCompra, cantidad);

        console.log("stop");
        // socket.on("transportista-subasta", (data) => {
        //     const seleccionados = "Saliste Seleccionado"
        //     setResultado(seleccionados);
        // });
        return;
    }

    if (resultado.length > 0) {
        return;
    }

    setTimeout(() => {
      cargarHora();
    }, 2000);
  }, [hora, referenciaCompra]);

  return { minutos: minutos.time, hora, resultado };
};

export default useTimeT;
