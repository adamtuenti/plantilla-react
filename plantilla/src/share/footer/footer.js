import React from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import './footer.css'; // Crea este archivo para tus estilos

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-icons">
                <a href="https://wa.me/+593984870784" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="footer-icon" />
                </a>
                <a href="https://www.instagram.com/tuinstagram" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="footer-icon" />
                </a>
            </div>
            <p style = {{ marginLeft: '7.5px', lineHeight: '2.5px', textAlign: 'left'}}>© 2023 | Dr. Zeus</p>
        </footer>
    );
};

export default Footer;
