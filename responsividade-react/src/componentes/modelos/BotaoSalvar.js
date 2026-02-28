// src/componentes/modelos/BotaoSalvar.js
import React from "react";
import "./BotaoSalvar.css";

function BotaoSalvar({ disabled }) {
  return (
    <button
      type="submit"
      className="botao-salvar"
     
    >
      Salvar
    </button>
  );
}

export default BotaoSalvar;
