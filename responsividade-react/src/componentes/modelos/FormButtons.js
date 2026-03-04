import React from "react";
import { Grid } from "@mui/material";
import BotaoSalvar from "./BotaoSalvar";
import BotaoCancelar from "./BotaoCancelar";
import "./FormButtons.css";
import { useTheme } from "@mui/material/styles";


function FormButtons({ onCancel, isFormValid }) {


 
      // Estilos baseados no tema
 

  return (
    <Grid  className="form-buttons"   >
      <BotaoCancelar onClick={onCancel} className="btn-cancelar" />
      <BotaoSalvar disabled={!isFormValid} className="btn-salvar" />
    </Grid>
  );
}

export default FormButtons;
