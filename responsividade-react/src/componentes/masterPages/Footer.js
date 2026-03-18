import React from "react";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import "./Footer.css";


function Footer() {

  const theme = useTheme();
  const iconColor = theme.palette.text.primary;   // Define a cor dos icones conforme o tema

  return (
    <footer
      className="footer"
      style={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary
      }}
    >

 

  <div className="footer-container">
      {/* Coluna 3: Redes sociais */}
      <div className="footer-section">

        <div className="social-links" style={{ color: iconColor }}>
          <div className="social-item">
            <a href="#"><Icon icon="mdi:facebook" width="28" height="28" color="currentColor" /></a>
          </div>
          <div className="social-item">
            <a href="#"><Icon icon="mdi:instagram" width="28" height="28" color="currentColor" /></a>
          </div>
          <div className="social-item">
            <a href="#"><Icon icon="mdi:linkedin" width="28" height="28" color="currentColor" /></a>
          </div>
          <div className="social-item">
            <a href="#"><Icon icon="mdi:whatsapp" width="28" height="28" color="currentColor" /></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
}

export default Footer; 
