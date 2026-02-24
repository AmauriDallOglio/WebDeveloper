// src/componentes/modelos/BotaoCancelar.js
import React from "react";
import { Button } from "@mui/material";

function BotaoCancelar({ onClick }) {
  return (
    <Button variant="outlined" color="warning" onClick={onClick}>
      Cancelar
    </Button>
  );
}

export default BotaoCancelar;
