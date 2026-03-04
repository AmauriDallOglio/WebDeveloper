// src/componentes/modelos/FormContainer.js
import React from "react";
import { Box, Paper } from "@mui/material";
import "./FormContainer.css";
import { useTheme } from "@mui/material/styles";


function FormContainer({ children }) 
{
  const theme = useTheme();

  // Estilos baseados no tema
  const containerStyle = {
    background: theme.palette.mode === "dark"
      ? "linear-gradient(270deg, #111828, #111828)" // fundo escuro
      : "linear-gradient(270deg, #e5e7eb, #e5e7eb)", // fundo claro
      borderRadius: "0px",
      padding: "2px",
  };

  return (
    <Box >
      <Paper 

        className="form-container-paper"
        style={containerStyle}
        elevation={0} // remove sombra
        square // remove bordas arredondadas extras
      >
        {children}
      </Paper>
    </Box>
  );
}

export default FormContainer;