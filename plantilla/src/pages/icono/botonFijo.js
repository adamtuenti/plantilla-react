import React from 'react';
import './botonFijo.css';
import ws from '../../share/images/whatsapp.png'

function BotonFijo() {
  const numeroWhatsApp = '+593984870784';
  const mensajeWhatsApp = 'Hola, vengo de la página web, deseo información.';

  const abrirWhatsApp = () => {
    // Crear el enlace de WhatsApp con el número y el mensaje
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;
    
    // Redirigir a WhatsApp
    window.open(enlaceWhatsApp, '_blank');
  };

  return (
    <div className="boton-fijo">
      <button onClick={abrirWhatsApp} style = {{ backgroundColor: 'transparent', borderColor: 'transparent' }} className="whatsapp-button">
        <img src={ws} width={47.5} alt="WhatsApp" /> {/* Reemplaza 'ruta/a/la/imagen-de-whatsapp.png' con la ruta de tu imagen de WhatsApp */}
      </button>
    </div>
  );
}

export default BotonFijo;
