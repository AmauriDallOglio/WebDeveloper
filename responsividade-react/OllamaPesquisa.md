# OllamaPesquisa — Registro de Implementação

## Objetivo
Criar a tela de pesquisa do Ollama com quatro blocos (tipo, pergunta, resposta e histórico), adicionar o menu “Inteligência Artificial” com item “Ollama” e registrar as configurações necessárias para manutenção.

## Arquivos principais
- `src/rotas/menuRoutes.js`
- `src/paginas/ollama/OllamaPesquisa.js`
- `src/paginas/ollama/OllamaPesquisa.css`
- `src/setupProxy.js`
- `package.json`

## Passos realizados
1. Menu e rota: adicionada categoria “Inteligência Artificial” e o item “Ollama” no menu em `src/rotas/menuRoutes.js`, com rota `"/ollama"` apontando para a página `OllamaPesquisa`.
2. Página principal: criada a tela em `src/paginas/ollama/OllamaPesquisa.js` com quatro blocos. Bloco 1: seleção do tipo de pesquisa (rádio). Bloco 2: pergunta com input multiline e botão Pesquisar. Bloco 3: resposta exibida em TextField MUI. Bloco 4: histórico em DataGrid com colunas Pergunta, Resposta, Tempo e Sucesso.
3. Regras de limpeza: ao trocar o tipo de pesquisa, limpa pergunta e resposta. Ao iniciar nova pesquisa, limpa resposta antes de buscar.
4. Integração com API: rotas `GET /api/Ollama/Prompt`, `GET /api/Ollama/PromptGenerativo`, `GET /api/Ollama/PromptGenerativoDados`. Query param `pergunta`. Parse robusto do response, aceitando `pergunta`, `resposta`, `tempo`, `sucesso` (case‑insensitive e com fallback para `dados`).
5. Histórico: cada pesquisa adiciona uma linha no grid com `id` incremental. Clique na linha preenche Pergunta e Resposta.
6. Estado de carregamento: botão muda para “Pesquisando”. Texto do botão fica azul e fundo cinza quando carregando. Grid desabilita (sem clique) e reduz opacidade enquanto carrega. Radios ficam desabilitados durante a requisição.
7. Estilos: layout e cores definidos em `src/paginas/ollama/OllamaPesquisa.css`. Uso de variáveis globais de `PaletaCores.css`.
8. Proxy e CORS: criado `src/setupProxy.js` para evitar CORS no dev. Proxy direciona `/api` para `https://localhost:7126` com `secure: false`. Adicionada dependência `http-proxy-middleware` em `package.json`. Necessário rodar `npm install` e reiniciar o `npm start`.

## Detalhes importantes para manutenção
- Base da API: se `REACT_APP_API_BASE_URL` estiver definida, ela será usada; caso contrário, o app usa URL relativa `/api` (proxy).
- Caso mude o formato do response, ajuste a normalização dos campos em `OllamaPesquisa.js`.
- Se o CORS voltar a ocorrer, revisar o proxy ou habilitar CORS no backend.
