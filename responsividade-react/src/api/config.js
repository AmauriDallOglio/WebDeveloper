const normalizeBaseUrl = (value) => {
  if (!value) {
    return "";
  }

  const trimmed = String(value).trim();
  if (!trimmed) {
    return "";
  }

  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
};

// Variavel inicial para definir se as rotas devem usar homologacao ou producao.
// Regra atual: localhost:3000 => homologacao | localhost:5001 => producao
const APP_PORT =
  typeof window !== "undefined" && window.location
    ? window.location.port
    : "";
const IS_HOMOLOGACAO = APP_PORT === "3000";

const ENV_CONFIG = IS_HOMOLOGACAO
  ? {
      app: "http://localhost:3000",
      auth: "http://localhost:5135",
      ollama: "http://localhost:5140"
    }
  : {
      app: "http://localhost:5001",
      auth: "http://localhost:5002",
      ollama: "http://localhost:5003"
    };

export const API_BASE_URL = normalizeBaseUrl(ENV_CONFIG.auth);

export const API_BASES = {
  auth: normalizeBaseUrl(ENV_CONFIG.auth),
  ollama: normalizeBaseUrl(ENV_CONFIG.ollama),
  default: API_BASE_URL
};

export const API_ENDPOINTS = {
  login: "/api/Token/GerarToken",
  ollama: {
    prompt: "/api/Ollama/Prompt",
    promptGenerativo: "/api/Ollama/PromptGenerativo",
    promptGenerativoDados: "/api/Ollama/PromptGenerativoDados"
  }
};

export const buildApiUrl = (path = "", baseUrl = API_BASE_URL) => {
  if (!path) {
    return baseUrl;
  }

  if (path.startsWith("http")) {
    return path;
  }

  if (!baseUrl) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
};
