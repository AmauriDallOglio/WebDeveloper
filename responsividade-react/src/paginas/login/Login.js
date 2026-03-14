import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import "./Login.css";

const decodeJwtPayload = (token) => {
  if (!token) {
    return null;
  }

  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) {
      return null;
    }

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

function Login({ onLoginSuccess }) {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const unauthorizedMessage = location.state?.unauthorized
    ? "Acesso não autorizado. Faça login para continuar."
    : "";

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
          sistemaSolicitado: "SistemaAmauri"
        })
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.sucesso) {
        const token = data?.dados?.token ?? "";
        const refresh = data?.dados?.refresh ?? "";
        const notification = data?.dados?.notificacao ?? "";
        const payload = decodeJwtPayload(token);
        const userName = payload?.Nome || payload?.name || payload?.Email || email;

        if (token) {
          localStorage.setItem("authToken", token);
        }

        if (refresh) {
          localStorage.setItem("refreshToken", refresh);
        }

        if (userName) {
          localStorage.setItem("userName", userName);
        }
        if (notification) {
          localStorage.setItem("notificationMessage", notification);
        } else {
          localStorage.removeItem("notificationMessage");
        }

        onLoginSuccess?.({ userName, notification, data });
        const destination = location.state?.from || "/";
        navigate(destination);
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

          {unauthorizedMessage && !error && (
            <p className="login-info">{unauthorizedMessage}</p>
          )}
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
