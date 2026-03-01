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

  // Estilos baseados no tema
  const containerStyle = {
    background: theme.palette.mode === "dark"
      ? "linear-gradient(270deg, #111828, #111828)" // fundo escuro
      : "linear-gradient(270deg, #f3f4f6, #e5e7eb)", // fundo claro
    color: theme.palette.mode === "dark" ? "#fff" : "#111",
    //borderRadius: "5px",
   // padding: "10px",
  };

  const cardStyle = {
    background: theme.palette.mode === "dark" ? "#1f2937" : "#ffffff",
    color: theme.palette.mode === "dark" ? "#e5e7eb" : "#111",
   // border: "1px solid",
  };

  return (
    <div className="details" style={containerStyle}>
      {textos.map((texto, index) => (
        <div key={index} className="card" style={cardStyle} title={texto}>
          {texto}
        </div>
      ))}
    </div>
  );
}

export default Details;
