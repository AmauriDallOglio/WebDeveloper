import React from "react";
import "./Details.css";

function Details() {
  const textos = [
    "Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente Lorem Ipsum é simplesmente uma simulação de texto",
    "Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente uma simulação de texto muito longo Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente Lorem Ipsum é simplesmente uma simulação de textoLorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente Lorem Ipsum é simplesmente uma simulação de texto",
    "Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente uma simulação de texto ainda mais longo Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente Lorem Ipsum é simplesmente uma simulação de textoLorem Ipsum é simplesmente uma simulação de texto Lorem Ipsum é simplesmente Lorem Ipsum é simplesmente uma simulação de texto"
  ];

  return (
    <div className="details">
      {textos.map((texto, index) => (
        <div key={index} className="card" title={texto}>
          {texto}
        </div>
      ))}
    </div>
  );
}

export default Details;
