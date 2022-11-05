
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
    <div  className='mt-4 grid md:grid-cols-6 sm:gap-7 justify-center  gap-2 grid-cols-2 sm:px-0 px-4 pb-24'>
        {productos.length > 0 && 
            productos.map((producto)=>(
                <ProductoCard key={producto.ID_PRODUCTO} agregando={agregando}  producto={producto} handleClick={handleClick}tipo={tipo}/>
            ))
        }
    </div>
)}

export default Productos