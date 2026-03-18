import React from "react";
import { Typography, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import "./FormHeader.css";
import PaletaCores from "../../estilos/PaletaCores";

function FormHeader({ titulo, subtitulo, icon }) {

  // Estilos baseados no tema
  const containerStyle = {
    background: PaletaCores.variaveis.gradienteFormHeader
  };

  return (
    <Box className="form-header-box" style={containerStyle} >
      <Box className="form-header-content">
        {icon && <Icon icon={icon} width="60" height="60"   />}
        <Box className="form-header-text">
          <Typography variant="h5" className="form-header-title">
            {titulo}
          </Typography>
          {subtitulo && (
            <Typography variant="subtitle2" className="form-header-subtitle">
              {subtitulo}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default FormHeader;
