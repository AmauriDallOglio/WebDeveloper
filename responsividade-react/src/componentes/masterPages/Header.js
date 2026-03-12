import React from "react";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import avatar from "./imagem/header/usuario.jpg";
import "./Header.css";
import { Typography } from "@mui/material";

function Header({ darkMode, setDarkMode, locale, setLocale }) {

  const theme = useTheme();

  return (

    <header
      className="header"
      style={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary
      }}
    >

      <div className="header-container">

        {/* Lado esquerdo */}
        <div className="header-left">

          <img
            src={avatar}
            alt="Foto de perfil"
            className="header-avatar"
          />

          <div>

            <Typography
              variant="h6"
              className="form-header-title"
              sx={{ color: "text.primary" }}
            >
              Olá! Amauri Dall'Oglio
            </Typography>

            <Typography
              variant="subtitle2"
              className="header-subtitle"
              sx={{ color: "text.secondary" }}
            >
              Existem informações sobre o projeto
            </Typography>

          </div>

        </div>

        {/* Lado direito */}
        <div
          className="header-right"
          style={{ color: theme.palette.text.primary }}
        >

          <button
            type="button"
            className="lang-toggle"
            onClick={() => setLocale(locale === "pt" ? "en" : "pt")}
            title={locale === "pt" ? "Mudar para InglÃªs" : "Switch to Portuguese"}
          >
            {locale === "pt" ? "PT" : "EN"}
          </button>

          <div className="theme-toggle"  
               onClick={() => setDarkMode(!darkMode)}  
               title={`Alternar para ${darkMode ? "Claro" : "Escuro"}`}  
            >
            {darkMode
              ? (
                <Icon
                  icon="material-symbols-light:light-mode-outline"
                  width="24"
                  height="24"
                  className="header-icon"
                />
              )
              : (
                <Icon
                  icon="material-symbols-light:moon-stars-outline"
                  width="24"
                  height="24"
                  className="header-icon"
                />
              )
            }
          </div>

          <Icon
           
            icon="material-symbols-light:mail-outline"
            width="24"
            height="24"
            className="header-icon"
          />

          <Icon
            
            icon="material-symbols-light:door-open-outline"
            width="24"
            height="24"
            className="header-icon"
          />

        </div>

      </div>

    </header>

  );
}

export default Header;
