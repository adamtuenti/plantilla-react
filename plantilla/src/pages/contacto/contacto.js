import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import './contacto.css'; // Estilo personalizado para esta página

const ContactPage = () => {
  const [typedContactText, setTypedContactText] = useState('');
  const [typedDeliveryText, setTypedDeliveryText] = useState('');
  const contactText = "¡EEstamos aquí para ayudarte! Ponte en contacto con nosotros a través de los siguientes medios:";
  const deliveryText = "HHacemos entregas todas las semanas, el diseño lo eliges a tu gusto y comodidad, escríbenos a nuestras redes sociales para más información";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < contactText.length) {
        setTypedContactText((prevText) => prevText + contactText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < deliveryText.length) {
        setTypedDeliveryText((prevText) => prevText + deliveryText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="contact-container">
      <h1>Contáctanos</h1>
      <p>{typedContactText}</p>

      <div className="contact-methods">
        <a href="https://wa.me/+593984870784" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="contact-icon whatsapp" />
          Escríbenos en WhatsApp
        </a>
        <a href="https://www.instagram.com/tuusuario" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="contact-icon instagram" />
          Síguenos en Instagram
        </a>
      </div>

      <div className="delivery-section">
        <h2>Hacemos Entregas</h2>
        <p>{typedDeliveryText}</p>
      </div>
    </div>
  );
}

export default ContactPage;
