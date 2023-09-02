import React, { useState } from 'react';
import './icono.css';
import BotonFijo from './botonFijo';

export default function Icono() {
  const [mostrarChat, setMostrarChat] = useState(false);
  const [ventanaEmergente, setVentanaEmergente] = useState([]);

  const toggleMostrarChat = () => {
    setMostrarChat(!mostrarChat);
    // Define la lista de botones cuando se muestra la ventana emergente
    setVentanaEmergente(['Botón 1', 'Botón 5']);
  };

  return (
    <div>
      <BotonFijo onClick={toggleMostrarChat} />

    </div>
  );
}
