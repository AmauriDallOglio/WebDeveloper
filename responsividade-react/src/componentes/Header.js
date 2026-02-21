import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo ou nome da marca */}
        <div className="logo">
          <h1>Minha Empresa</h1>
        </div>

        {/* Navegação */}
        <nav className="nav">
          <ul>
            <li><a href="#">Início</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Serviços</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
