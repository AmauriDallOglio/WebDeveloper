import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { IconButton, InputAdornment } from "@mui/material";
import "./Login.css";
import InputString from "../../componentes/modelos/InputString";
import PaletaCores from "../../estilos/PaletaCores";
import { API_BASES, API_ENDPOINTS, buildApiUrl } from "../../api/config";

// Decodifica o payload do JWT para extrair dados do usuario (sem validar assinatura).
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

const normalizeText = (value) => (typeof value === "string" ? value.trim() : "");

const buildNameFromParts = (first, last) => {
  const parts = [normalizeText(first), normalizeText(last)].filter(Boolean);
  return parts.join(" ");
};

const formatNameFromEmail = (emailAddress) => {
  const normalized = normalizeText(emailAddress);
  if (!normalized || !normalized.includes("@")) {
    return "";
  }

  const localPart = normalized.split("@")[0];
  const cleaned = localPart.replace(/[._-]+/g, " ").replace(/\d+/g, " ").trim();
  if (!cleaned) {
    return "";
  }

  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
};

const getNameFromPayload = (payload) => {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  const fullNameFromParts = buildNameFromParts(
    payload.given_name ||
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"] ||
      payload.Nome ||
      payload.nome,
    payload.family_name ||
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"] ||
      payload.Sobrenome ||
      payload.sobrenome
  );

  if (fullNameFromParts) {
    return fullNameFromParts;
  }

  const candidates = [
    payload.name,
    payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    payload.preferred_username,
    payload.unique_name,
    payload.Email,
    payload.email
  ];

  for (const candidate of candidates) {
    const normalized = normalizeText(candidate);
    if (normalized && !normalized.includes("@")) {
      return normalized;
    }
  }

  return "";
};

const getEmailFromPayload = (payload) => {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  const candidates = [
    payload.email,
    payload.Email,
    payload.preferred_username,
    payload.unique_name
  ];

  for (const candidate of candidates) {
    const normalized = normalizeText(candidate);
    if (normalized.includes("@")) {
      return normalized;
    }
  }

  return "";
};

const resolveUserName = (payload, fallbackEmail) => {
  const nameFromPayload = getNameFromPayload(payload);
  if (nameFromPayload) {
    return nameFromPayload;
  }

  const emailCandidate = getEmailFromPayload(payload) || normalizeText(fallbackEmail);
  const nameFromEmail = formatNameFromEmail(emailCandidate);
  return nameFromEmail || emailCandidate;
};

function Login({ onLoginSuccess }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [erroEmail, setErroEmail] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);
  const [showSenha, setShowSenha] = useState(false);
  // Mensagem vinda da rota anterior quando o usuario tentou acessar sem login.
  const unauthorizedMessage = location.state?.unauthorized
    ? "Acesso não autorizado. Faça login para continuar."
    : "";

  // Habilita o botao apenas quando ha dados validos e nao esta carregando.
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
      // Envia credenciais para gerar token na API.
      const response = await fetch(
        buildApiUrl(API_ENDPOINTS.login, API_BASES.auth),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            senha,
            sistemaSolicitado: "SistemaAmauri"
          })
        }
      );

      const data = await response.json().catch(() => null);

      if (response.ok && data?.sucesso) {
        const token = data?.dados?.token ?? "";
        const refresh = data?.dados?.refresh ?? "";
        const notification = data?.dados?.notificacao ?? "";
        const payload = decodeJwtPayload(token);
        const userName = resolveUserName(payload, email);

        // Persiste dados essenciais para manter a sessao do usuario.
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

        // Permite que o componente pai reaja ao login bem-sucedido.
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
        background: PaletaCores.variaveis.gradienteLogin,
        color: PaletaCores.variaveis.textoPrimario
      }}
    >
      <div
        className="login-card"
        style={{
          background: PaletaCores.variaveis.fundoSuperficie,
          borderColor: PaletaCores.variaveis.borda
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
          <InputString
            label="E-mail"
            type="email"
            value={email}
            onChange={(event) => {
              const nextValue = event.target.value;
              setEmail(nextValue);
              if (erroEmail && nextValue.trim() !== "") {
                setErroEmail(false);
              }
            }}
            onBlur={(event) => setErroEmail(event.target.value.trim() === "")}
            error={erroEmail}
            helperText={erroEmail ? "Campo obrigatório" : ""}
            icon="material-symbols-light:mail-outline-rounded"
          />

          <InputString
            label="Senha"
            type={showSenha ? "text" : "password"}
            value={senha}
            onChange={(event) => {
              const nextValue = event.target.value;
              setSenha(nextValue);
              if (erroSenha && nextValue.trim() !== "") {
                setErroSenha(false);
              }
            }}
            onBlur={(event) => setErroSenha(event.target.value.trim() === "")}
            error={erroSenha}
            helperText={erroSenha ? "Campo obrigatório" : ""}
            icon="material-symbols-light:key-vertical-outline-rounded"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowSenha((prev) => !prev)}
                  edge="end"
                  aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}
                  size="small"
                >
                  <Icon
                    icon={
                      showSenha
                        ? "material-symbols-light:visibility-off-outline-rounded"
                        : "material-symbols-light:visibility-outline-rounded"
                    }
                    width="22"
                    height="22"
                  />
                </IconButton>
              </InputAdornment>
            }
          />

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
