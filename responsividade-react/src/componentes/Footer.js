import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Coluna 1: Logo ou nome */}
        <div className="footer-section">
          <h2>Minha Empresa</h2>
          <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>

        {/* Coluna 2: Links de navegação */}
        <div className="footer-section">
          <h3>Navegação</h3>
          <ul>
            <li><a href="#">Início</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Serviços</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </div>

        {/* Coluna 3: Redes sociais */}
        <div className="footer-section">
          <h3>Redes sociais</h3>
          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
