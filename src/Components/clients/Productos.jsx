
import React, { useEffect } from 'react'
import useAuth from '../../Hooks/useAuth'
// import fotoPrueba from './img/FrenteAVaras.png'
import {useState} from 'react'
import {ProductoCard} from './inicio/ProductoCard';



const Productos = ({productos, tipo}) => {

    const {carrito, setCarrito} = useAuth();
    const [agregando, setAgregando] = useState({cargando: false, id: ''})    


    useEffect(() => {
        localStorage.setItem('carrito',JSON.stringify(carrito))
    }, [carrito])


    const handleClick = (producto) =>{
        const verUnidadAgregada = carrito.find(({ID})=>(ID === producto.ID));
        // console.log(verUnidadAgregada.unidad);
        // console.log(carrito, producto)
        /// VALIDAR SI HAY STOCK SUFICIENTE PARA AGREGAR AL CARRITO
        // console.log(verUnidadAgregada)
        // console.log(Number(producto.CANTIDAD) < verUnidadAgregada.unidad)
        if(verUnidadAgregada && Number(producto.CANTIDAD) <= verUnidadAgregada.unidad && tipo==="local"){
            alert("Limite de stock alcanzado")
            return;
        }
        setAgregando({cargando:true,id: producto.ID})

        const existe = carrito.some(p => p.ID === producto.ID);
        if(existe){
            const nuevos = carrito.map(p =>{
                // console.log(p.unidad)
                if(p.ID ===producto.ID){
                    p.unidad++;
                    return p;
                }else{
                    return p
                }
            })
            setCarrito([...nuevos])

        }else{
            setCarrito([...carrito, producto])

        }
        setTimeout(() => {
            setAgregando({cargando:false,
                        id: ''})
        }, 1000);
    }



return (
    <div  className='mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 md:gap-4 gap-3 gap-y-4  justify-center   sm:px-4 2xl:px-0 px-4 pb-24'>
        {productos.length > 0 && 
            productos.map((producto)=>(
                <ProductoCard  key={producto.ID_PRODUCTO} agregando={agregando}  producto={producto} handleClick={handleClick}tipo={tipo}/>
            ))
        }
    </div>
)}

export default Productos