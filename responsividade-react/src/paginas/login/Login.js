import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import "./Login.css";

function Login({ onLoginSuccess }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && senha.trim().length > 0 && !isLoading;
  }, [email, senha, isLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5135/api/Token/GerarToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          senha,
          sistemaSolicitado : "SistemaAmauri"
        })
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.sucesso) {
        const token = data?.dados?.token ?? "";
        const refresh = data?.dados?.refresh ?? "";

        if (token) {
          localStorage.setItem("authToken", token);
        }

        if (refresh) {
          localStorage.setItem("refreshToken", refresh);
        }

        onLoginSuccess?.(data);
        navigate("/");             
        return;
      }

      setError(data?.mensagem || "Usuário ou senha incorreto.");
    } catch (err) {
      setError("Não foi possível conectar na API.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        background:
          theme.palette.mode === "dark"
            ? "radial-gradient(circle at top, #1b273a, #0a0f1b 60%)"
            : "radial-gradient(circle at top, #ffffff, #e8edf3 60%)",
        color: theme.palette.text.primary
      }}
    >
      <div
        className="login-card"
        style={{
          background: theme.palette.background.paper,
          borderColor: theme.palette.divider
        }}
      >
        <div className="login-header">
          <span className="login-kicker">Bem-vindo</span>
          <h1 className="login-title">Entrar no sistema</h1>
          <p className="login-subtitle">
            Informe seu e-mail e senha para acessar.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span>E-mail</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="voce@empresa.com"
              required
            />
          </label>

          <label className="login-field">
            <span>Senha</span>
            <input
              type="password"
              name="senha"
              autoComplete="current-password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="Sua senha"
              required
            />
          </label>

          {error && <p className="login-error">{error}</p>}

          <button
            type="submit"
            className={`login-button ${canSubmit ? "ready" : ""}`}
            disabled={!canSubmit}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
