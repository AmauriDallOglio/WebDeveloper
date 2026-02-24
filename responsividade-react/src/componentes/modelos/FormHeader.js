// src/componentes/modelos/FormHeader.js
import React from "react";
import { Typography, Box } from "@mui/material";

function FormHeader({ titulo }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h5">{titulo}</Typography>
    </Box>
  );
}

export default FormHeader;

