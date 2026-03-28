import React, { useMemo, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./OllamaPesquisa.css";
import { API_BASES, API_ENDPOINTS, buildApiUrl } from "../../api/config";

const TIPOS_PESQUISA = [
  {
    value: "prompt",
    label: "Prompt",
    rota: API_ENDPOINTS.ollama.prompt
  },
  {
    value: "promptGenerativo",
    label: "Prompt Generativo",
    rota: API_ENDPOINTS.ollama.promptGenerativo
  },
  {
    value: "promptGenerativoDados",
    label: "Prompt Generativo Dados",
    rota: API_ENDPOINTS.ollama.promptGenerativoDados
  }
];

const normalizarTexto = (valor) => {
  if (valor === null || valor === undefined) {
    return "";
  }
  if (typeof valor === "string") {
    return valor;
  }
  try {
    return JSON.stringify(valor, null, 2);
  } catch (error) {
    return String(valor);
  }
};

const normalizarBoolean = (valor) => {
  if (typeof valor === "boolean") {
    return valor;
  }
  if (typeof valor === "number") {
    return valor !== 0;
  }
  if (typeof valor === "string") {
    const texto = valor.trim().toLowerCase();
    return texto === "true" || texto === "1" || texto === "sim" || texto === "yes";
  }
  return false;
};

const obterValorCaseInsensitive = (objeto, chave) => {
  if (!objeto || typeof objeto !== "object") {
    return undefined;
  }

  const chaveEncontrada = Object.keys(objeto).find(
    (item) => item.toLowerCase() === chave.toLowerCase()
  );

  return chaveEncontrada ? objeto[chaveEncontrada] : undefined;
};

function OllamaPesquisa({ localeText }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [tipoPesquisa, setTipoPesquisa] = useState("");
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [historico, setHistorico] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const nextId = useRef(1);
  const abortControllerRef = useRef(null);

  const canSearch = Boolean(tipoPesquisa) && pergunta.trim().length > 0;

  const columns = useMemo(
    () => [
      {
        field: "pergunta",
        headerName: "Pergunta",
        flex: 1.4,
        minWidth: 220
      },
      {
        field: "resposta",
        headerName: "Resposta",
        flex: 2.2,
        minWidth: 320
      },
      {
        field: "tempo",
        headerName: "Tempo",
        width: 140
      },
      {
        field: "sucesso",
        headerName: "Sucesso",
        width: 120,
        valueFormatter: (params) =>
          normalizarBoolean(params.value) ? "Sim" : "Não"
      }
    ],
    []
  );

  const handleTipoChange = (event) => {
    const novoTipo = event.target.value;
    setTipoPesquisa(novoTipo);
    setPergunta("");
    setResposta("");
  };

  const handlePesquisar = async () => {
    if (isLoading) {
      abortControllerRef.current?.abort();
      return;
    }

    if (!canSearch) {
      return;
    }

    const tipoSelecionado = TIPOS_PESQUISA.find(
      (tipo) => tipo.value === tipoPesquisa
    );

    if (!tipoSelecionado) {
      return;
    }

    const perguntaLimpa = pergunta.trim();
    setResposta("");
    setIsLoading(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const authToken = localStorage.getItem("authToken");
    const headers = authToken
      ? {
          Authorization: `Bearer ${authToken}`
        }
      : {};

    try {
      const baseUrl = buildApiUrl(tipoSelecionado.rota, API_BASES.ollama);
      const url = `${baseUrl}?pergunta=${encodeURIComponent(perguntaLimpa)}`;

      const response = await fetch(url, {
        method: "GET",
        headers,
        signal: controller.signal
      });

      const rawText = await response.text();
      let data = {};

      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch (parseError) {
        data = rawText || {};
      }

      const isObject = typeof data === "object" && data !== null;
      const dadosPayload =
        isObject && typeof data?.dados === "object" && data?.dados !== null
          ? data.dados
          : null;
      const payload =
        dadosPayload && Object.keys(dadosPayload).length > 0 ? dadosPayload : data;

      const perguntaResposta = normalizarTexto(
        payload?.Pergunta ??
          payload?.pergunta ??
          data?.Pergunta ??
          data?.pergunta ??
          perguntaLimpa
      );
      const respostaResposta = normalizarTexto(
        payload?.Resposta ??
          payload?.resposta ??
          data?.Resposta ??
          data?.resposta ??
          (isObject ? data?.mensagem : data) ??
          ""
      );
      const tempoResposta = normalizarTexto(
        payload?.Tempo ?? payload?.tempo ?? data?.Tempo ?? data?.tempo ?? ""
      );
      const sucessoBruto =
        obterValorCaseInsensitive(payload, "sucesso") ??
        obterValorCaseInsensitive(data, "sucesso") ??
        response.ok;
      const sucessoResposta = normalizarBoolean(sucessoBruto);

      if (!response.ok && !respostaResposta) {
        setResposta("Não foi possível realizar a pesquisa.");
      } else {
        setResposta(respostaResposta);
      }

      setHistorico((prev) => [
        ...prev,
        {
          id: nextId.current++,
          pergunta: perguntaResposta || perguntaLimpa,
          resposta: respostaResposta,
          tempo: tempoResposta,
          sucesso: sucessoResposta
        }
      ]);
    } catch (error) {
      if (error?.name === "AbortError") {
        setResposta("Pesquisa cancelada.");
        return;
      }
      setResposta("Não foi possível realizar a pesquisa.");
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleRowClick = (params) => {
    if (isLoading) {
      return;
    }
    setPergunta(params.row?.pergunta ?? "");
    setResposta(params.row?.resposta ?? "");
  };

  return (
    <div className={`ollama-container ${isDark ? "dark" : "light"}`}>
      <div className="ollama-header">
        <div className="ollama-icon">
          <Icon icon="mdi:robot-outline" width="20" height="20" />
        </div>
        <div className="ollama-title-group">
          <h1 className="ollama-title">Ollama</h1>
          <p className="ollama-subtitle">Pesquisa com Inteligência Artificial</p>
        </div>
      </div>

      <section className="ollama-section">
        <h2 className="ollama-section-title">1. Tipo de pesquisa</h2>
        <FormControl
          component="fieldset"
          className="ollama-form-control"
          disabled={isLoading}
        >
          <FormLabel className="ollama-form-label">
            Selecione o tipo de pesquisa
          </FormLabel>
          <RadioGroup
            row
            value={tipoPesquisa}
            onChange={handleTipoChange}
            className="ollama-radio-group"
          >
            {TIPOS_PESQUISA.map((tipo) => (
              <FormControlLabel
                key={tipo.value}
                value={tipo.value}
                control={<Radio />}
                label={tipo.label}
                disabled={isLoading}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </section>

      <section className={`ollama-section ${!tipoPesquisa ? "is-disabled" : ""}`}>
        <h2 className="ollama-section-title">2. Pergunta</h2>
        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={10}
          placeholder="Digite a sua pergunta..."
          value={pergunta}
          onChange={(event) => setPergunta(event.target.value)}
          disabled={!tipoPesquisa}
          className="ollama-textarea"
        />
        <div className="ollama-actions">
          <Button
            variant="contained"
            className={`ollama-search-button ${isLoading ? "is-loading" : ""}`}
            onClick={handlePesquisar}
            disabled={!canSearch && !isLoading}
          >
            {isLoading ? "Pesquisando..." : "Pesquisar"}
          </Button>
        </div>
      </section>

      <section className="ollama-section">
        <h2 className="ollama-section-title">
          {isLoading ? "3. Pesquisando..." : "3. Resposta"}
        </h2>
        <TextField
          fullWidth
          multiline
          minRows={6}
          maxRows={14}
          placeholder="A resposta aparecerá aqui."
          value={resposta}
          InputProps={{ readOnly: true }}
          className="ollama-textarea"
        />
      </section>

      <section className="ollama-section">
        <h2 className="ollama-section-title">4. Histórico</h2>
        <div className={`ollama-grid ${isLoading ? "is-disabled" : ""}`}>
          <DataGrid
            rows={historico}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            className="ollama-datagrid"
            localeText={localeText}
            onRowClick={handleRowClick}
          />
        </div>
      </section>
    </div>
  );
}

export default OllamaPesquisa;
