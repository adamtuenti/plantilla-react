import React, { useState } from 'react';
import RouterPage from './router';
import Header from './share/header/header';
import { CartProvider } from "./hooks/useContext";
import './App.css';
import Chatbot from './pages/chatbot/chatbot';
import Footer from './share/footer/footer';
import Icono from './pages/icono/icono'

export default function App() {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen);
  };

  return (
    <div className="app-container">
      <CartProvider>
        <Header />
        <RouterPage />
        {/* Agrega el BotonFijo aquí */}
        <div className="boton-fijo-container">
          <Icono />
        </div>
      </CartProvider>
    </div>
  );
}

