// src/componentes/modelos/FormHeader.js
import React from "react";
import { Typography, Box } from "@mui/material";
import "./FormHeader.css";

function FormHeader({ titulo }) {
  return (
    <Box className="form-header-box" >
      <Typography variant="h5">{titulo}</Typography>
    </Box>
  );
}

export default FormHeader;

