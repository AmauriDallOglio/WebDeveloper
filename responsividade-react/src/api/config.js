// Configure URLs via env vars:
// REACT_APP_API_ENV=producao|homologacao|local
// REACT_APP_API_URL_PRODUCAO, REACT_APP_API_URL_HOMOLOGACAO, REACT_APP_API_URL_LOCAL
// REACT_APP_API_BASE_URL (fallback)
// Service-specific overrides:
// REACT_APP_API_AUTH_URL_PRODUCAO, REACT_APP_API_AUTH_URL_HOMOLOGACAO, REACT_APP_API_AUTH_URL_LOCAL
// REACT_APP_API_OLLAMA_URL_PRODUCAO, REACT_APP_API_OLLAMA_URL_HOMOLOGACAO, REACT_APP_API_OLLAMA_URL_LOCAL
// REACT_APP_API_AUTH_BASE_URL, REACT_APP_API_OLLAMA_BASE_URL
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

const API_ENV = String(
  process.env.REACT_APP_API_ENV || process.env.NODE_ENV || "local"
).toLowerCase();

const baseUrls = {
  producao: normalizeBaseUrl(process.env.REACT_APP_API_URL_PRODUCAO),
  homologacao: normalizeBaseUrl(process.env.REACT_APP_API_URL_HOMOLOGACAO),
  local: normalizeBaseUrl(
    process.env.REACT_APP_API_URL_LOCAL || "http://localhost:5135"
  ),
  base: normalizeBaseUrl(process.env.REACT_APP_API_BASE_URL)
};

const resolveApiBaseUrl = () => {
  if (API_ENV.startsWith("prod")) {
    return baseUrls.producao || baseUrls.base || "";
  }

  if (API_ENV.startsWith("homo") || API_ENV.startsWith("stag")) {
    return baseUrls.homologacao || baseUrls.base || baseUrls.local || "";
  }

  if (API_ENV.startsWith("dev") || API_ENV.startsWith("local")) {
    return baseUrls.local || baseUrls.base || "";
  }

  return (
    baseUrls[API_ENV] ||
    baseUrls.base ||
    baseUrls.homologacao ||
    baseUrls.local ||
    ""
  );
};

export const API_BASE_URL = resolveApiBaseUrl();

const resolveServiceBaseUrl = (serviceKey, options = {}) => {
  const key = String(serviceKey || "").trim().toUpperCase();
  if (!key) {
    return API_BASE_URL;
  }

  const serviceUrls = {
    producao: normalizeBaseUrl(process.env[`REACT_APP_API_${key}_URL_PRODUCAO`]),
    homologacao: normalizeBaseUrl(process.env[`REACT_APP_API_${key}_URL_HOMOLOGACAO`]),
    local: normalizeBaseUrl(process.env[`REACT_APP_API_${key}_URL_LOCAL`]),
    base: normalizeBaseUrl(process.env[`REACT_APP_API_${key}_BASE_URL`])
  };

  if (API_ENV.startsWith("prod")) {
    return (
      serviceUrls.producao ||
      serviceUrls.base ||
      baseUrls.producao ||
      baseUrls.base ||
      ""
    );
  }

  if (API_ENV.startsWith("homo") || API_ENV.startsWith("stag")) {
    return (
      serviceUrls.homologacao ||
      serviceUrls.base ||
      baseUrls.homologacao ||
      baseUrls.base ||
      baseUrls.local ||
      ""
    );
  }

  if (API_ENV.startsWith("dev") || API_ENV.startsWith("local")) {
    const localFallback =
      options.localDefault !== undefined
        ? normalizeBaseUrl(options.localDefault)
        : baseUrls.local;
    return serviceUrls.local || serviceUrls.base || localFallback || baseUrls.base || "";
  }

  return (
    serviceUrls[API_ENV] ||
    serviceUrls.base ||
    baseUrls[API_ENV] ||
    baseUrls.base ||
    baseUrls.homologacao ||
    baseUrls.local ||
    ""
  );
};

export const API_BASES = {
  auth: resolveServiceBaseUrl("AUTH", { localDefault: "http://localhost:5135" }),
  // Default local Ollama host; override with env when needed.
  ollama: resolveServiceBaseUrl("OLLAMA", { localDefault: "http://localhost:5140" }),
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
