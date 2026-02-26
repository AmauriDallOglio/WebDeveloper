import React, { useState } from "react";
import FormHeader from "../../componentes/modelos/FormHeader";
import FormContainer from "../../componentes/modelos/FormContainer";
import FormButtons from "../../componentes/modelos/FormButtons";

// importa os três tipos de input
import InputString from "../../componentes/modelos/InputString";
import InputNumeroInteiro from "../../componentes/modelos/InputNumeroInteiro";
import InputNumeroDecimal from "../../componentes/modelos/InputNumeroDecimal";

function ClienteCadastro() {
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [salario, setSalario] = useState("");

  const [erroCodigo, setErroCodigo] = useState("");
  const [erroNome, setErroNome] = useState(true);
  const [erroIdade, setErroIdade] = useState(true);
  const [erroSalario, setErroSalario] = useState(true);

  const isFormValid = !erroCodigo &&  !erroNome && !erroIdade && !erroSalario;

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Formulário enviado!");
  };

  const handleCancel = () => {
    setCodigo("");
    setNome("");
    setIdade("");
    setSalario("");
    setErroCodigo(true);
    setErroNome(true);
    setErroIdade(true);
    setErroSalario(true);
  };

  return (
    <div style={{ minHeight: "100vh"}}>

      <FormHeader 
        titulo="Cliente" 
        subtitulo="Formulário de inserção" 
        icon="material-symbols-light:person-outline" 
      />


      <FormContainer>
        <form onSubmit={handleSubmit}  className="form-container-grid">
          
          {/* Input String */}
          <InputString
            label="Codigo"
            value={codigo}
            onChange={(e) => setNome(e.target.value)}
            onBlur={() => setErroNome(codigo.trim() === "")}
            error={erroCodigo}
            helperText={erroCodigo ? "Campo obrigatório" : ""}
            icon="material-symbols-light:person-outline"
          />

          {/* Input String */}
          <InputString
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onBlur={() => setErroNome(nome.trim() === "")}
            error={erroNome}
            helperText={erroNome ? "Campo obrigatório" : ""}
            icon="material-symbols-light:person-outline"
          />

          {/* Input Número Inteiro */}
          <InputNumeroInteiro
            label="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            onBlur={() => setErroIdade(idade.trim() === "")}
            error={erroIdade}
            helperText={erroIdade ? "Campo obrigatório" : ""}
            icon="material-symbols-light:calendar-month-outline"
          />

          {/* Input Número Decimal */}
          <InputNumeroDecimal
            label="Salário"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            onBlur={() => setErroSalario(salario.trim() === "")}
            error={erroSalario}
            helperText={erroSalario ? "Campo obrigatório" : ""}
            icon="material-symbols-light:attach-money"
          />


 
          {/* Botões ocupam a linha inteira */}
          <div className="form-buttons">
            <FormButtons onCancel={handleCancel} isFormValid={isFormValid} />
          </div>



        </form>
      </FormContainer>
    </div>
  );
}

export default ClienteCadastro;
