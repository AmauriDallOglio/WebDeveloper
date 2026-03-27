import React from "react";
import "./Details.css";
import { useTheme } from "@mui/material/styles";

function Details() {

  const theme = useTheme();

  const textos = [
    "Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente...",
    "Lorem Ipsum é simplesmente uma simulação de texto muito longo...",
    "Lorem Ipsum é simplesmente uma simulação de texto ainda mais longo..."
  ];

  /* =====================================================
     Estilos baseados no tema do App
  ===================================================== */

  const containerStyle = {
    background: theme.palette.background.default,
    color: theme.palette.text.primary
  };

  const cardStyle = {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`
  };

  return (

    <div className="details" style={containerStyle}>

      {textos.map((texto, index) => (

        <div
          key={index}
          className="card"
          style={cardStyle}
          title={texto}
        >
          {texto}
        </div>

      ))}

    </div>

  );

}

export default Details;