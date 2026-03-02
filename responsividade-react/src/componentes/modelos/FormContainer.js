// src/componentes/modelos/FormContainer.js
import React from "react";
import { Box, Paper } from "@mui/material";
import "./FormContainer.css";
import { useTheme } from "@mui/material/styles";


function FormContainer({ children }) {

  const theme = useTheme();

  // Estilos baseados no tema
  const containerStyle = {
    background: theme.palette.mode === "dark"
      ? "linear-gradient(270deg, #111828, #111828)" // fundo escuro
      : "linear-gradient(270deg, #f3f4f6, #e5e7eb)", // fundo claro
    color: theme.palette.mode === "dark" ? "#fff" : "#111828",
    //borderRadius: "5px",
   // padding: "10px",
  };


  return (
    <Box >
      <Paper className="form-container-paper" style={containerStyle} >
        {children}
      </Paper>
    </Box>
  );
}

export default FormContainer;
