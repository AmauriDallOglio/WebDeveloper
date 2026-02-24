import React from "react";
import img1 from "../imagem/imagem1.webp";
import "./Galeria.css";

function Galeria() {
  return (
    <div className="galeria-container">
      <div className="image-card"><img src={img1} alt="Flexbox exemplo" /></div>
      <div className="image-card"><img src={img1} alt="Flexbox exemplo" /></div>
      <div className="image-card"><img src={img1} alt="Flexbox exemplo" /></div>
      <div className="image-card"><img src={img1} alt="Flexbox exemplo" /></div>
      <div className="image-card"><img src={img1} alt="Flexbox exemplo" /></div>
    </div>
  );
}

export default Galeria;
