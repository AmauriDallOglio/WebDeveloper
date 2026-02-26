import React from "react";
import { Typography, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import "./FormHeader.css";

function FormHeader({ titulo, subtitulo, icon }) {
  return (
    <Box className="form-header-box">
      <Box className="form-header-content">
        {icon && <Icon icon={icon} width="60" height="60" className="form-header-icon" />}
        <Box className="form-header-text">
          <Typography variant="h5" className="form-header-title">
            {titulo}
          </Typography>
          {subtitulo && (
            <Typography variant="subtitle1" className="form-header-subtitle">
              {subtitulo}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default FormHeader;
