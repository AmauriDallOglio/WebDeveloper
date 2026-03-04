// src/componentes/modelos/BotaoCancelar.js
import React from "react";
import { useTheme } from "@mui/material/styles";
import "./BotaoCancelar.css";

function BotaoCancelar({ onClick }) {
  const theme = useTheme();

  return (
    <button
      className={`botao-cancelar ${theme.palette.mode}`} // adiciona "light" ou "dark"
      onClick={onClick}
    >
      Cancelar
    </button>
  );
}

export default BotaoCancelar;
