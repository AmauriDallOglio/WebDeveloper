// src/componentes/modelos/BotaoSalvar.js
import React from "react";
import { useTheme } from "@mui/material/styles";
import "./BotaoSalvar.css";

function BotaoSalvar({ disabled }) {
  const theme = useTheme();

  return (
    <button
      type="submit"
      className={`botao-salvar ${theme.palette.mode}`} // adiciona "light" ou "dark"
      disabled={disabled}
    >
      Salvar
    </button>
  );
}

export default BotaoSalvar;
