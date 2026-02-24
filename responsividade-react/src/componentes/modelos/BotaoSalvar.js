// src/componentes/modelos/BotaoSalvar.js
import React from "react";
import { Button } from "@mui/material";

function BotaoSalvar({ disabled }) {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="success"
      fullWidth
      disabled={disabled}
    >
      Salvar
    </Button>
  );
}

export default BotaoSalvar;
