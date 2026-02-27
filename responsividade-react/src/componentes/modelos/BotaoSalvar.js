// src/componentes/modelos/BotaoSalvar.js
import React from "react";
import { Button } from "@mui/material";
import "./BotaoSalvar.css";

function BotaoSalvar({ disabled }) {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="success"
      fullWidth
      disabled={disabled}
      className="botao-salvar"
    >
      Salvar
    </Button>
  );
}

export default BotaoSalvar;
