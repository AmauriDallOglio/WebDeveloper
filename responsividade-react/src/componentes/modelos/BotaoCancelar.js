// src/componentes/modelos/BotaoCancelar.js
import React from "react";
import "./BotaoCancelar.css";

function BotaoCancelar({ onClick }) {
  return (
    <button
      className="botao-cancelar"
      onClick={onClick} 
    >
      Cancelar
    </button>
  );
}

export default BotaoCancelar;
