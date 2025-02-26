import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <h2>Conéctate con nosotros</h2>
            <p>Síguenos en nuestras redes sociales para más actualizaciones</p>
            <div className="social-icons">
                <a href="https://www.instagram.com/bailoteca_/" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="bi bi-instagram"></i>
                </a>
                <a href="https://www.facebook.com/LaBailoteca/?locale=es_ES" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="bi bi-facebook"></i>
                </a>
                <a href="https://twitter.com/Bailoteca" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className="bi bi-twitter"></i>
                </a>
            </div>
            <div className="footer-links">
                <a href="#">Política de privacidad</a>
                <a href="#">Términos y condiciones</a>
                <a href="#">Contacto</a>
            </div>
            <p>&copy; 2025 La Bailoteca. Todos los derechos reservados.</p>
        </footer>
    );
}

export default Footer;
