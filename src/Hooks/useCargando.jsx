import React from 'react'

export const useCargando = () => {
  const [cargando, setCargando] = useState(false)
  
  return {setCargando, cargando};
}
