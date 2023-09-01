import React, { useState, useEffect } from 'react';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import './chatbot.css';
import { getPreguntasRespuestas } from '../../api/api';

export default function Chatbot() {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestaActual, setRespuestaActual] = useState('');
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const datos = await getPreguntasRespuestas();
      setPreguntas(datos);
    }

    fetchData();
  }, []);

  const handlePreguntaClick = (pregunta, respuesta) => {
    addUserMessage(pregunta);
    setRespuestaActual(respuesta);
  };

  useEffect(() => {
    if (respuestaActual) {
      const respuestaArray = respuestaActual.split('');
      let respuestaTexto = '';
      respuestaArray.forEach((letra, index) => {
        setTimeout(() => {
          respuestaTexto += letra;
          if (index === respuestaArray.length - 1) {
            addResponseMessage(respuestaTexto);
          }
        }, 100 * (index + 1));
      });
    }
  }, [respuestaActual]);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="chatbot-container">
      <div className={`chat-window ${showChat ? 'show' : ''}`}>
        <div className="close-button" onClick={toggleChat}>
          X
        </div>
        {respuestaActual ? (
          <div className="respuesta">{respuestaActual}</div>
        ) : (
          <div className="preguntas-container">
            {preguntas.map((pregunta, index) => (
              <button
                key={index}
                className="pregunta-button"
                onClick={() => handlePreguntaClick(pregunta.Pregunta, pregunta.Respuesta)}
              >
                {pregunta.Pregunta}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={`chatbot-icon ${showChat ? 'hide' : ''}`} onClick={toggleChat}>
        Chat
      </div>
    </div>
  );
}
