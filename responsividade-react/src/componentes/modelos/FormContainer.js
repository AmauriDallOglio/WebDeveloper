// src/componentes/modelos/FormContainer.js
import React from "react";
import { Box, Paper } from "@mui/material";
import "./FormContainer.css";

function FormContainer({ children }) {
  return (
    <Box >
      <Paper className="form-container-paper">
        {children}
      </Paper>
    </Box>
  );
}

export default FormContainer;
