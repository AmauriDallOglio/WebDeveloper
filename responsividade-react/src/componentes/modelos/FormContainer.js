// src/componentes/modelos/FormContainer.js
import React from "react";
import { Box, Paper } from "@mui/material";
import "./FormContainer.css";
import PaletaCores from "../../estilos/PaletaCores";


function FormContainer({ children }) 
{
  // Estilos baseados no tema
  const containerStyle = {
    background: PaletaCores.variaveis.gradienteFormContainer,
    borderRadius: "0px",
    padding: "2px"
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
