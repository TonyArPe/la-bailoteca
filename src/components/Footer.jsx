import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
    return (
        <div className="footer">
            <h2>Conoce nuestras redes sociales</h2>
            <div className="social-icons">
                <a href="https://www.instagram.com/bailoteca_/" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-instagram social-icon"></i>
                </a>
                <a href="https://www.facebook.com/LaBailoteca/?locale=es_ES" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-facebook social-icon"></i>
                </a>
                <a href="https://twitter.com/Bailoteca" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-twitter social-icon"></i>
                </a>
            </div>
        </div>
    );
}

export default Footer;
