import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import avatar from "./imagem/header/usuario.jpg";
import "./Header.css";
import { Typography } from "@mui/material";

function Header({ darkMode, setDarkMode, locale, setLocale, userName, notificationMessage, onLogout }) {

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handlePointerDown = (event) => {
      const target = event.target;
      if (menuRef.current && menuRef.current.contains(target)) {
        return;
      }
      if (toggleRef.current && toggleRef.current.contains(target)) {
        return;
      }
      setMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [menuOpen]);
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
    <header className="header glass-surface">

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
              sx={{ color: notificationMessage ? "error.main" : "text.secondary" }}
            >
              {notificationMessage || greetingMessage}
            </Typography>

          </div>

        </div>

        {/* Lado direito */}
        <div className="header-right">
          <div className="header-menu-wrapper">
            <button
              type="button"
              className="menu-toggle"
              ref={toggleRef}
              onClick={() => setMenuOpen((prev) => !prev)}
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
              <div id="header-menu" className="header-menu" ref={menuRef}>
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

                    <button
                      type="button"
                      className="header-menu-item header-menu-close"
                      onClick={closeMenu}
                      title="Fechar menu"
                      aria-label="Fechar menu"
                    >
                      <Icon
                        icon="material-symbols-light:close"
                        width="22"
                        height="22"
                        className="header-icon"
                      />
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
