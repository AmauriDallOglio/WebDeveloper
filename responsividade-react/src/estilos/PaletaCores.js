class PaletaCores {
  static modos = {
    claro: "light",
    escuro: "dark"
  };

  static variaveis = {
    primaria: "var(--cor-primaria)",
    primariaEscura: "var(--cor-primaria-escura)",
    textoPrimario: "var(--cor-texto-primario)",
    textoSecundario: "var(--cor-texto-secundario)",
    textoDetalhes: "var(--cor-texto-detalhes)",
    fundoApp: "var(--cor-fundo-app)",
    fundoSuperficie: "var(--cor-fundo-superficie)",
    borda: "var(--cor-borda)",
    gradienteDetalhes: "var(--gradiente-detalhes)",
    gradienteLogin: "var(--gradiente-login-fundo)",
    gradienteFormHeader: "var(--gradiente-form-header)",
    gradienteFormContainer: "var(--gradiente-form-container)",
    gradienteFormBody: "var(--gradiente-form-body)",
    erro: "var(--cor-erro)",
    sucesso: "var(--cor-sucesso)",
    info: "var(--cor-info)",
    aviso: "var(--cor-aviso)"
  };

  static obterModo(darkMode) {
    return darkMode ? PaletaCores.modos.escuro : PaletaCores.modos.claro;
  }

  static aplicarTema(modo) {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.setAttribute("data-theme", modo);
  }

  static lerValoresCss() {
    if (typeof document === "undefined") {
      return {
        fundoApp: "#ffffff",
        fundoSuperficie: "#ffffff",
        primaria: "#000000",
        primariaEscura: "#000000",
        textoPrimario: "#000000",
        textoSecundario: "#000000",
        borda: "#000000",
        erro: "#ff0000",
        sucesso: "#00aa00",
        info: "#0088ff",
        aviso: "#ff9900"
      };
    }

    const estilos = getComputedStyle(document.documentElement);
    const ler = (nome) => estilos.getPropertyValue(nome).trim();

    return {
      fundoApp: ler("--cor-fundo-app"),
      fundoSuperficie: ler("--cor-fundo-superficie"),
      primaria: ler("--cor-primaria"),
      primariaEscura: ler("--cor-primaria-escura"),
      textoPrimario: ler("--cor-texto-primario"),
      textoSecundario: ler("--cor-texto-secundario"),
      borda: ler("--cor-borda"),
      erro: ler("--cor-erro"),
      sucesso: ler("--cor-sucesso"),
      info: ler("--cor-info"),
      aviso: ler("--cor-aviso")
    };
  }

  static criarTemaMui(modo) {
    const valores = PaletaCores.lerValoresCss();

    return {
      palette: {
        mode: modo,
        background: {
          default: valores.fundoApp,
          paper: valores.fundoSuperficie
        },
        primary: {
          main: valores.primaria,
          dark: valores.primariaEscura
        },
        text: {
          primary: valores.textoPrimario,
          secondary: valores.textoSecundario
        },
        divider: valores.borda,
        error: {
          main: valores.erro
        },
        success: {
          main: valores.sucesso
        },
        info: {
          main: valores.info
        },
        warning: {
          main: valores.aviso
        }
      }
    };
  }
}

export default PaletaCores;
