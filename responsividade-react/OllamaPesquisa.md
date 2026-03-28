# OllamaPesquisa — Registro de Implementação

## Objetivo
Criar a tela de pesquisa do Ollama com quatro blocos (tipo, pergunta, resposta e histórico), adicionar o menu “Inteligência Artificial” com item “Ollama” e registrar as configurações necessárias para manutenção.


# Projeto: responsividade-react

## 1. Categoria e Item
- Criar uma categoria chamada **Inteligência Artificial** com o item chamado **Ollama**.  
- Ao clicar no item **Ollama**, abrirá a tela de pesquisa dividida em partes.

---

## 2. Primeira Parte – Seleção do tipo de pesquisa
- Bloco de seleção com opções em **radio button**:  
  - "Prompt"  
  - "Prompt Generativo"  
  - "Prompt Generativo Dados"  
- Ao selecionar qualquer opção, habilita a segunda parte.

---

## 3. Segunda Parte – Bloco de Pergunta
- Formada por um **input** para inserir a pergunta (pode aumentar conforme o tamanho do texto).  
- Abaixo, botão **Pesquisar** na cor azul.  
- Ao clicar no botão:  
  - Label muda de "Pesquisar" para "Pesquisando".  
  - Botão fica desabilitado.  
  - Label em azul: "Pesquisando...".  
  - Dispara as rotas conforme a seleção do radio da primeira parte:  

### Rotas
- **Prompt** → `GET /api/Ollama/Prompt`  
  - Request: atributo *pergunta*  
  - Response: Pergunta, Resposta, Tempo, Bool Sucesso  

- **Prompt Generativo** → `GET /api/Ollama/PromptGenerativo`  
  - Request: atributo *pergunta*  
  - Response: Pergunta, Resposta, Tempo, Bool Sucesso  

- **Prompt Generativo Dados** → `GET /api/Ollama/PromptGenerativoDados`  
  - Request: atributo *pergunta*  
  - Response: Pergunta, Resposta, Tempo, Bool Sucesso  

---

## 4. Terceira Parte – Bloco de Resposta
- Mostra a resposta das rotas no atributo **Resposta** em componente de texto do React MUIA.  
- Para cada pesquisa, deve limpar o bloco de resposta.  
- Para cada mudança na primeira parte, deve limpar o bloco de pergunta e o bloco de resposta.

---

## 5. Quarta Parte – Grid de Histórico
- Grid com colunas:  
  - Pergunta  
  - Resposta  
  - Tempo  
  - Sucesso (Sim ou Não)  

### Comportamento
- Ao clicar em uma linha:  
  - A coluna **Pergunta** é mostrada no bloco de pergunta.  
  - A coluna **Resposta** é mostrada no bloco de resposta.  

- Importante:  
  - Enquanto o botão **Pesquisar** estiver aguardando resposta:  
    - Seleção da linha não deve carregar os blocos.  
    - Grid fica desabilitado.  
    - Radios ficam desabilitados para evitar mudança de tipo no meio da requisição.



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


