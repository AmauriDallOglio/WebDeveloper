import React from "react";
import { Grid } from "@mui/material";
import BotaoSalvar from "./BotaoSalvar";
import BotaoCancelar from "./BotaoCancelar";
import "./FormButtons.css";

function FormButtons({ onCancel, isFormValid }) {
  return (
    <Grid  className="form-buttons">
      <BotaoCancelar onClick={onCancel} className="btn-cancelar" />
      <BotaoSalvar disabled={!isFormValid} className="btn-salvar" />
    </Grid>
  );
}

export default FormButtons;
