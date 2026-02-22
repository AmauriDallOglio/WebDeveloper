import React from "react";
import "./Header.css";
import avatar from "../imagem/header/usuario.jpg"; // imagem local do usuário
import { Icon } from "@iconify/react"; // biblioteca de ícones

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      <div className="header-container">
        
        {/* Esquerda: avatar + saudação */}
        <div className="header-left">
          <img src={avatar} alt="Foto de perfil" className="header-avatar" />
          <div>
            <h2>Olá! Amauri Dall'Oglio</h2>
            <p>Existem informações sobre o projeto</p>
          </div>
        </div>

        {/* Direita: ícones */}
        <div className="header-right">
          {/* Botão de troca de tema */}
          <div 
            className="theme-toggle" 
            onClick={() => setDarkMode(!darkMode)}
            title={`Alternar para ${darkMode ? "Claro" : "Escuro"}`}
          >
            {darkMode 
              ? <Icon icon="material-symbols-light:light-mode-outline" width="24" height="24" /> 
              : <Icon icon="material-symbols-light:moon-stars-outline" width="24" height="24" />}
          </div>

          {/* Outros ícones */}
          <Icon icon="material-symbols-light:mail-outline" width="24" height="24" />
          <Icon icon="material-symbols-light:door-open-outline" width="24" height="24" />
        </div>
      </div>
    </header>
  );
}

export default Header;
