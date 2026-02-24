// src/componentes/modelos/FormContainer.js
import React from "react";
import { Box, Paper } from "@mui/material";
import "./FormContainer.css";

function FormContainer({ children }) {
  return (
    <Box sx={{ flex: 1, py: 4 }}>
      <Paper elevation={3} className="form-container">
        {children}
      </Paper>
    </Box>
  );
}

export default FormContainer;
