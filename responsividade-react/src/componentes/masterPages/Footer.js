import React from "react";
import "./Footer.css";
import { Icon } from "@iconify/react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
 
 
        {/* Coluna 3: Redes sociais */}
        <div className="footer-section">

          <div className="social-links">
            <div className="social-item">
              <a href="#"><Icon icon="mdi:facebook" width="28" height="28" /></a>

            </div>
            <div className="social-item">
              <a href="#"><Icon icon="mdi:instagram" width="28" height="28" /></a>
  
            </div>
            <div className="social-item">
              <a href="#"><Icon icon="mdi:linkedin" width="28" height="28" /></a>
   
            </div>
            <div className="social-item">
              <a href="#"><Icon icon="mdi:whatsapp" width="28" height="28" /></a>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 