import React from "react";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import "./Footer.css";

function Footer({ darkMode }) {

  const theme = useTheme();

  const iconColor = theme.palette.mode === "dark" ? "#ffffff" : "#000000";   // Define a cor dos ícones conforme o tema
 

  return (
    <footer
      style={{
        background: theme.palette.mode === "dark"
          ? "linear-gradient(270deg, #111828, #111828)" // fundo escuro
          : "linear-gradient(270deg, #f3f4f6, #e5e7eb)", // fundo claro
        color: theme.palette.mode === "dark" ? "#fff" : "#000000",
      }}
      className="footer"
    >

 

      <div className="footer-container">
        {/* Coluna 3: Redes sociais */}
        <div className="footer-section">

          <div className="social-links">
            <div className="social-item">
              <a href="#"><Icon icon="mdi:facebook" width="28" height="28" color={iconColor} /></a>
            </div>
            <div className="social-item">
              <a href="#"><Icon icon="mdi:instagram" width="28" height="28" color={iconColor} /></a>
            </div>
            <div className="social-item">
              <a href="#"><Icon icon="mdi:linkedin" width="28" height="28" color={iconColor} /></a>
            </div>
            <div className="social-item">
              <a href="#"><Icon icon="mdi:whatsapp" width="28" height="28" color={iconColor} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 