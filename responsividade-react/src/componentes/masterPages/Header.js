import React from "react";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import avatar from "./imagem/header/usuario.jpg";
import "./Header.css";

function Header({ darkMode, setDarkMode }) {
  const theme = useTheme();

  return (
    <header
      style={{
        background: theme.palette.mode === "dark"
          ? "linear-gradient(270deg, #111828, #111828)" /* define fundo com gradiente escuro */
          : "linear-gradient(270deg, #f3f4f6, #e5e7eb)", // fundo claro
      }}
      className="header"
    >
      <div className="header-container">
        <div className="header-left">
          <img src={avatar} alt="Foto de perfil" className="header-avatar" />
          <div>
            <p className="header-caption-menu">Olá! Amauri Dall'Oglio</p>
            <p>Existem informações sobre o projeto</p>
          </div>
        </div>

        <div className="header-right">
          <div
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={`Alternar para ${darkMode ? "Claro" : "Escuro"}`}
          >
            {darkMode
              ? <Icon icon="material-symbols-light:light-mode-outline" width="24" height="24" />
              : <Icon icon="material-symbols-light:moon-stars-outline" width="24" height="24" />}
          </div>

          <Icon icon="material-symbols-light:mail-outline" width="24" height="24" />
          <Icon icon="material-symbols-light:door-open-outline" width="24" height="24" />
        </div>
      </div>
    </header>
  );
}

export default Header;
