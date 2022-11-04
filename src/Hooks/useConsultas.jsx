import { useContext } from "react";
import ClienteContext from "../context/ClienteProvider";




const useConsultas = () => useContext(ClienteContext);



export default useConsultas;