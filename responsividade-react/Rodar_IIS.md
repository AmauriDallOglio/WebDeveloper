# Rodar no IIS

**Resumo**
Este projeto React gera arquivos estaticos. No IIS voce publica a pasta `build`.

**1) Preparar o build**
1. No terminal, dentro da pasta do projeto:
```bash
npm install
npm run build
```
2. Isso cria a pasta `build` com os arquivos prontos para publicar.

**2) Configurar variaveis de ambiente**
1. As variaveis `REACT_APP_*` sao fixadas no build.
2. Para producao, crie um `.env.production` antes do `npm run build`.
3. Exemplo:
```bash
REACT_APP_API_ENV=producao
REACT_APP_API_URL_PRODUCAO=https://api.minhaempresa.com
REACT_APP_API_URL_HOMOLOGACAO=https://hml-api.minhaempresa.com
REACT_APP_API_URL_LOCAL=http://localhost:5135
```

**3) SPA routing no IIS (React Router)**
1. Crie um arquivo `web.config` dentro da pasta `build`.
2. Conteudo recomendado:
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React SPA" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```
3. O IIS precisa do modulo **URL Rewrite** instalado para isso funcionar.

**4) Publicar no IIS**
1. Abra o IIS Manager.
2. Crie um novo **Site** ou **Aplicativo** apontando para a pasta `build`.
3. Pool de aplicativos: **No Managed Code**.

**4.1) Publicacao automatica (script)**
1. Use o script `publicar_iis.ps1` na raiz do projeto.
2. Exemplo (ajuste a pasta do site no IIS):
```powershell
.\publicar_iis.ps1 -SitePath "C:\inetpub\wwwroot\meuapp" -Env "producao"
```
3. O script faz `npm install`, `npm run build` e copia a pasta `build` para o IIS.

**5) Publicar em subpasta**
1. Se o site ficar em algo como `https://dominio/meusistema`, configure o `homepage` no `package.json` antes do build:
```json
"homepage": "/meusistema"
```
2. Depois refaça `npm run build`.

**6) Observacoes**
1. O `setupProxy.js` nao e usado no IIS (ele so vale no dev). Garanta que as URLs de API estejam corretas no build.
2. Se precisar trocar endpoints sem novo build, use variaveis no servidor ou um arquivo de configuracao externo.
3. Caso o PowerShell bloqueie a execucao, rode:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
