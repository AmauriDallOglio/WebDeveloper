import React from "react";
import { Grid } from "@mui/material";
import InputComIcone from "./InputComIcone";

function FormInputs({ nome, setNome, erroNome, setErroNome, email, setEmail, erroEmail, setErroEmail, mensagem, setMensagem, erroMensagem, setErroMensagem }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <InputComIcone
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onBlur={() => setErroNome(nome.trim() === "")}
          error={erroNome}
          helperText={erroNome ? "Campo obrigatório" : ""}
          icon="material-symbols-light:person-outline"
        />
      </Grid>

      <Grid item xs={12}>
        <InputComIcone
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setErroEmail(email.trim() === "")}
          error={erroEmail}
          helperText={erroEmail ? "Campo obrigatório" : ""}
          icon="material-symbols-light:mail-outline"
        />
      </Grid>

      <Grid item xs={12}>
        <InputComIcone
          label="Telefone"
          type="tel"
          icon="material-symbols-light:call-outline"
        />
      </Grid>

      <Grid item xs={12}>
        <InputComIcone
          label="Mensagem"
          multiline
          rows={3}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          onBlur={() => setErroMensagem(mensagem.trim() === "")}
          error={erroMensagem}
          helperText={erroMensagem ? "Campo obrigatório" : ""}
          icon="material-symbols-light:chat-outline"
        />
      </Grid>
    </Grid>
  );
}

export default FormInputs;
