import React, { useState } from "react";
import FormHeader from "../../componentes/modelos/FormHeader";
import FormContainer from "../../componentes/modelos/FormContainer";
import FormInputs from "../../componentes/modelos/FormInputs";
import FormButtons from "../../componentes/modelos/FormButtons";

function ClienteCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const [erroNome, setErroNome] = useState(true);
  const [erroEmail, setErroEmail] = useState(true);
  const [erroMensagem, setErroMensagem] = useState(true);

  const isFormValid = !erroNome && !erroEmail && !erroMensagem;

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Formulário enviado!");
  };

  const handleCancel = () => {
    setNome("");
    setEmail("");
    setMensagem("");
    setErroNome(true);
    setErroEmail(true);
    setErroMensagem(true);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <FormHeader titulo="Formulário de cadastro de cliente" />

      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormInputs
            nome={nome}
            setNome={setNome}
            erroNome={erroNome}
            setErroNome={setErroNome}
            email={email}
            setEmail={setEmail}
            erroEmail={erroEmail}
            setErroEmail={setErroEmail}
            mensagem={mensagem}
            setMensagem={setMensagem}
            erroMensagem={erroMensagem}
            setErroMensagem={setErroMensagem}
          />

          <FormButtons onCancel={handleCancel} isFormValid={isFormValid} />
        </form>
      </FormContainer>
    </div>
  );
}

export default ClienteCadastro;
