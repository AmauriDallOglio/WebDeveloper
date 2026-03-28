param(
  [string]$SitePath = "C:\inetpub\wwwroot\meuapp",
  [string]$Env = "producao"
)

$ErrorActionPreference = "Stop"

Write-Host "== Build React ==" -ForegroundColor Cyan
if (-not (Test-Path -Path "package.json")) {
  throw "Execute este script na raiz do projeto React (onde existe package.json)."
}

$env:REACT_APP_API_ENV = $Env

npm install
if ($LASTEXITCODE -ne 0) { throw "Falha no npm install." }

npm run build
if ($LASTEXITCODE -ne 0) { throw "Falha no npm run build." }

$buildPath = Join-Path (Get-Location) "build"
if (-not (Test-Path $buildPath)) {
  throw "Pasta build nao encontrada."
}

Write-Host "== Publicar no IIS ==" -ForegroundColor Cyan
if (-not (Test-Path $SitePath)) {
  Write-Host "Criando pasta: $SitePath" -ForegroundColor Yellow
  New-Item -ItemType Directory -Force -Path $SitePath | Out-Null
}

# Copia limpa: remove conteudo antigo e sincroniza
robocopy $buildPath $SitePath /MIR /NFL /NDL /NJH /NJS /NC /NS | Out-Null
if ($LASTEXITCODE -ge 8) { throw "Falha no robocopy. Codigo: $LASTEXITCODE" }

Write-Host "Publicado com sucesso em: $SitePath" -ForegroundColor Green
