import React from "react";
import { Grid } from "@mui/material";
import BotaoSalvar from "./BotaoSalvar";
import BotaoCancelar from "./BotaoCancelar";
import "./FormButtons.css";
import { useTheme } from "@mui/material/styles";


function FormButtons({ onCancel, isFormValid }) {


  const theme = useTheme();

      // Estilos baseados no tema
  const containerStyle = {
    background: theme.palette.mode === "dark"
      ? "linear-gradient(270deg, #111828, #111828)" // fundo escuro
      : "linear-gradient(270deg, #f3f4f6, #e5e7eb)", // fundo claro
    color: theme.palette.mode === "dark" ? "#fff" : "#111",
    //borderRadius: "5px",
   // padding: "10px",
  };


  return (
    <Grid  className="form-buttons" style={containerStyle} >
      <BotaoCancelar onClick={onCancel} className="btn-cancelar" />
      <BotaoSalvar disabled={!isFormValid} className="btn-salvar" />
    </Grid>
  );
}

export default FormButtons;
