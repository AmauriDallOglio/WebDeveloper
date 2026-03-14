import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import avatar from "./imagem/header/usuario.jpg";
import "./Header.css";
import { Typography } from "@mui/material";

function Header({ darkMode, setDarkMode, locale, setLocale, userName, notificationMessage, onLogout }) {

  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const greetingMessage = (() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Bom dia";
    }
    if (hour < 18) {
      return "Boa tarde";
    }
    return "Boa noite";
  })();

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
              Olá! {userName || "Usuário"}
            </Typography>

            <Typography
              variant="subtitle2"
              className="header-subtitle"
              sx={{ color: notificationMessage ? "#ef4444" : "text.secondary" }}
            >
              {notificationMessage || greetingMessage}
            </Typography>

          </div>

        </div>

        {/* Lado direito */}
        <div
          className="header-right"
          style={{ color: theme.palette.text.primary }}
        >
          <div className="header-menu-wrapper">
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              title={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="header-menu"
            >
              <Icon
                icon="material-symbols-light:door-open-outline"
                width="24"
                height="24"
                className="header-icon"
              />
            </button>

            {menuOpen && (
              <div id="header-menu" className="header-menu">
                <div className="header-menu-top">
                  <button
                    type="button"
                    className="header-menu-item"
                    title="Mensagens"
                  >
                    <Icon
                      icon="material-symbols-light:mail-outline"
                      width="24"
                      height="24"
                      className="header-icon"
                    />
                  </button>

                  <button
                    type="button"
                    className="header-menu-item theme-toggle"
                    onClick={() => setDarkMode(!darkMode)}
                    title={`Alternar para ${darkMode ? "Claro" : "Escuro"}`}
                  >
                    {darkMode ? (
                      <Icon
                        icon="material-symbols-light:light-mode-outline"
                        width="24"
                        height="24"
                        className="header-icon"
                      />
                    ) : (
                      <Icon
                        icon="material-symbols-light:moon-stars-outline"
                        width="24"
                        height="24"
                        className="header-icon"
                      />
                    )}
                  </button>

                  <button
                    type="button"
                    className="header-menu-item lang-toggle"
                    onClick={() => setLocale(locale === "pt" ? "en" : "pt")}
                    title={locale === "pt" ? "Mudar para InglÃªs" : "Switch to Portuguese"}
                  >
                    {locale === "pt" ? "PT" : "EN"}
                  </button>
                </div>

                <div className="header-menu-separator" />

                <button
                  type="button"
                  className="header-menu-exit"
                  onClick={onLogout}
                >
                  Sair
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </header>

  );
}

export default Header;
