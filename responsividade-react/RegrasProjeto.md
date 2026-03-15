# Documento de Regras do Projeto (responsividade-react)

## Objetivo
Este documento consolida as regras e comportamentos implementados no projeto para que possam ser reutilizados em futuras gerações do site.

## Autenticação e Login
- Tela de login com campos obrigatórios de e-mail e senha.
- Botão "Entrar" só habilita quando ambos os campos possuem valor.
- Validação de obrigatório marca o campo em vermelho ao perder o foco vazio e volta à cor padrão ao preencher.
- A senha possui botão para exibir/ocultar o conteúdo digitado.

## Chamada de API para Token
- Endpoint: `http://localhost:5135/api/Token/GerarToken`.
- Método: `POST`.
- Body enviado:
```json
{
  "email": "string",
  "senha": "string",
  "sistemaSolicitado": "string"
}
```
- O campo `sistemaSolicitado` é fixo e sempre enviado como `"SistemaAmauri"`.

## Tratamento de Resposta do Token
- Em caso de sucesso (`sucesso: true`):
  - Salva `dados.token` em `localStorage` como `authToken`.
  - Salva `dados.refresh` em `localStorage` como `refreshToken` (se existir).
  - Decodifica o JWT para obter o nome do usuário.
  - Salva o nome em `localStorage` como `userName`.
  - Salva `dados.notificacao` em `localStorage` como `notificationMessage` (se existir); se não houver, remove a chave.
  - Redireciona para a rota originalmente tentada ou para `/`.
- Em caso de falha:
  - Exibe mensagem da API ou "Usuário ou senha incorreto.".

## Proteção de Rotas
- Se o usuário não estiver autenticado e tentar acessar qualquer rota do sistema (ex.: `/clientes`), ele é redirecionado para `/login`.
- A tela de login exibe a mensagem "Acesso não autorizado. Faça login para continuar." quando o acesso foi bloqueado.
- Após login, o usuário retorna automaticamente para a rota que tentou acessar.

## Header
- Saudação personalizada no topo: "Olá! {nome}".
  - O nome vem do JWT (campo `Nome`, `name` ou `Email`).
- Mensagem secundária no header:
  - Se existir `notificationMessage`, exibe a notificação em vermelho.
  - Se não existir, exibe "Bom dia", "Boa tarde" ou "Boa noite" conforme a hora atual do navegador.
- Menu do header:
  - Botão abre/fecha um painel com ações rápidas.
  - Ações: mensagens (ícone), alternar tema (claro/escuro), alternar idioma (PT/EN) e "Sair".

## Logout
- O botão "Sair" no menu do header faz logout:
  - Remove `authToken`, `refreshToken`, `userName`, `notificationMessage`.
  - Retorna para a tela de login.

## Tema Global e Idioma
- O tema é criado com MUI (`ThemeProvider`) e alterna entre `dark` e `light`.
- Paleta ajusta `background.default`, `background.paper`, `text`, `divider` e `primary`.
- Tipografia global: `Segoe UI`, `Roboto`, `Helvetica`, `Arial`, `sans-serif`.
- O idioma do DataGrid alterna entre PT e EN via `locale` no `App`.

## Componentes e Padrões de Input
- Os inputs do login utilizam o componente `InputString` (com ícones).
- O `InputString` aceita:
  - `label`, `value`, `onChange`, `onBlur`, `error`, `helperText`, `icon`, `type`.
  - `endAdornment` para ações extras (como mostrar/ocultar senha).
- `InputNumeroInteiro` permite apenas números inteiros (remove caracteres não numéricos).
- `InputNumeroDecimal` aceita ponto ou vírgula e normaliza para ponto.
- `InputComIcone` usa `TextField` do MUI com ícone à esquerda e suporte a `endAdornment`.

## Rotas e Navegação
- Menu é agrupado em `Principal` e `Administração`, com itens definidos em `menuRoutes`.
- Rotas principais:
  - `/`: Página inicial com seção "Saiba mais" (componente `Details`).
  - `/clientes`: Grid de clientes (`ClienteGrid`).
  - `/contato`: Cadastro de cliente (`ClienteCadastro`).
  - `/financeiro` e `/usuarios`: exibem "Em construção".
- Sidebar colapsa/expande grupos e destaca o item ativo.

## Layout e Responsividade
- O layout usa CSS Grid com áreas: `header`, `sidebar`, `details-body`, `footer`.
- Mobile: layout empilhado (header, sidebar, conteúdo, footer).
- Desktop (>= 1024px): sidebar fixo à esquerda, header/conteúdo/footer à direita.
- Breakpoints principais: 600px, 640px e 1024px (dependendo do componente).
- `Details` muda de coluna única para cards em linha no desktop.
- Sidebar no mobile/tablet vira menu horizontal rolável nas subcategorias.

## Página de Clientes (Grid)
- Usa `@mui/x-data-grid`.
- Colunas: `codigo`, `nome`, `idade`, `sexo` e ação `editar` (ícone de lápis).
- `getRowId` usa `guid`.
- Paginação: 10 por página com opções 10/25/50.
- Seleção com checkbox; botões "Excluir" e "Copiar" só habilitam quando há seleção.
- Busca filtra por `nome` (case-insensitive).
- Botão "Incluir" está presente (ação ainda não implementada).
- Dados são mockados em `src/integracao/clienteDados.js`.

## Cadastro de Cliente (Formulário)
- Página `/contato` exibe formulário com `FormHeader`, `FormContainer` e `FormButtons`.
- Campos: Código, Nome, Idade (inteiro), Salário (decimal).
- Validação de obrigatório no `onBlur`.
- Botão "Salvar" habilita apenas quando o formulário é válido.
- `Salvar` dispara `alert("Formulário enviado!")`.
- `Cancelar` limpa campos e reseta erros.

## Componentes de Formulário
- `FormHeader`: título, subtítulo e ícone, com gradiente por tema.
- `FormContainer`: wrapper com `Paper` e gradiente por tema.
- `FormButtons`: exibe `Cancelar` e `Salvar` alinhados; responsivo por breakpoints.
- Botões seguem o tema (classe `light`/`dark`) e estados de hover/disabled.

## Footer
- Contém ícones de redes sociais (Facebook, Instagram, LinkedIn, WhatsApp).
- Links são placeholders (`#`) e mudam de cor no hover.

## Assets e Imagens
- Avatar do header: `src/componentes/masterPages/imagem/header/usuario.jpg`.
- Logo do sidebar: `src/componentes/masterPages/imagem/sidebar/logo.webp`.
- Ícone de info: `src/componentes/masterPages/imagem/header/material-symbols-light--info-outline-rounded.svg`.
- Galeria (flexbox): `src/componentes/modelos/Galeria.js` com `imagem1.webp` (componente pronto para uso, não está em rota).

## Arquivos Principais
- `src/paginas/login/Login.js`
- `src/paginas/login/Login.css`
- `src/App.js`
- `src/App.css`
- `src/rotas/menuRoutes.js`
- `src/componentes/masterPages/Header.js`
- `src/componentes/masterPages/Sidebar.js`
- `src/componentes/masterPages/Footer.js`
- `src/componentes/masterPages/Details.js`
- `src/componentes/modelos/InputString.js`
- `src/componentes/modelos/InputComIcone.js`
- `src/componentes/modelos/InputNumeroInteiro.js`
- `src/componentes/modelos/InputNumeroDecimal.js`
- `src/componentes/modelos/FormHeader.js`
- `src/componentes/modelos/FormContainer.js`
- `src/componentes/modelos/FormButtons.js`
- `src/componentes/modelos/BotaoSalvar.js`
- `src/componentes/modelos/BotaoCancelar.js`
- `src/paginas/cliente/ClienteGrid.js`
- `src/paginas/cliente/ClienteCadastro.js`
- `src/integracao/clienteDados.js`

## Observações
- O nome do usuário mostrado no header depende do payload do JWT.
- O comportamento de saudação depende do horário local do navegador.
