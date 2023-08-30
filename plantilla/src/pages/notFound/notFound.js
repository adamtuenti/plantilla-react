import React from 'react';
import { Link } from 'react-router-dom';
import './notFound.css'; // Asegúrate de tener un archivo CSS para estilizar la página
import errorImage from './error-404-image.png'; // Agrega la imagen representativa

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">Error 404</h1>
                <p className="not-found-text">La página que estás buscando no fue encontrada.</p>
                <img src={errorImage} alt="Error 404" className="not-found-image" />
                <Link to="/" className="not-found-link">
                    Volver a la página de inicio
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
