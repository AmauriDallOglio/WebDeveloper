import React from "react";
import { Grid } from "@mui/material";
import BotaoSalvar from "./BotaoSalvar";
import BotaoCancelar from "./BotaoCancelar";

function FormButtons({ onCancel, isFormValid }) {
  return (
    <Grid item xs={12} className="form-buttons">
      <BotaoCancelar onClick={onCancel} className="btn-cancelar" />
      <BotaoSalvar disabled={!isFormValid} className="btn-salvar" />
    </Grid>
  );
}

export default FormButtons;
