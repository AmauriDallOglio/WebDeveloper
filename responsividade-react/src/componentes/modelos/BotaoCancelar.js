// src/componentes/modelos/BotaoCancelar.js
import React from "react";
import { Button } from "@mui/material";
import "./BotaoCancelar.css";

function BotaoCancelar({ onClick }) {
  return (
    <Button 
      variant="outlined" 
      color="warning" 
      onClick={onClick} 
      className="botao-cancelar"
    >
      Cancelar
    </Button>
  );
}

export default BotaoCancelar;
