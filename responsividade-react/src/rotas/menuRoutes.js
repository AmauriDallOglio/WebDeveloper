import React from "react";

import Details from "../componentes/masterPages/Details";
import Cliente from "../paginas/cliente/ClienteGrid";
import ClienteCadastro from "../paginas/cliente/ClienteCadastro";
import OllamaPesquisa from "../paginas/ollama/OllamaPesquisa";

function PaginaInicial() {
  return (
    <section>
      <h3>Saiba mais</h3>
      <Details />
    </section>
  );
}

function EmConstrucao({ titulo }) {
  return (
    <section>
      <h3>{titulo}</h3>
      <p>Em construção.</p>
    </section>
  );
}

export const menuGroups = [
  {
    id: "principal",
    label: "Principal",
    items: [
      {
        path: "/",
        label: "Início",
        icon: "material-symbols-light:account-balance-outline",
        routeKey: "home"
      },
      {
        path: "/clientes",
        label: "Clientes",
        icon: "material-symbols-light:person-outline",
        routeKey: "clientes"
      },
      {
        path: "/contato",
        label: "Contato",
        icon: "mdi:email-outline",
        routeKey: "contato"
      }
    ]
  },
  {
    id: "administracao",
    label: "Administração",
    items: [
      {
        path: "/financeiro",
        label: "Financeiro",
        icon: "material-symbols-light:money-bag-outline",
        routeKey: "financeiro"
      },
      {
        path: "/usuarios",
        label: "Usuários",
        icon: "material-symbols-light:account-box-outline",
        routeKey: "usuarios"
      }
    ]
  },
  {
    id: "inteligencia-artificial",
    label: "Inteligência Artificial",
    items: [
      {
        path: "/ollama",
        label: "Ollama",
        icon: "mdi:robot-outline",
        routeKey: "ollama"
      }
    ]
  }
];

export const appRoutes = [
  {
    key: "home",
    path: "/",
    element: <PaginaInicial />
  },
  {
    key: "clientes",
    path: "/clientes",
    element: ({ dataGridLocaleText }) => (
      <Cliente localeText={dataGridLocaleText} />
    )
  },
  {
    key: "contato",
    path: "/contato",
    element: <ClienteCadastro />
  },
  {
    key: "financeiro",
    path: "/financeiro",
    element: <EmConstrucao titulo="Financeiro" />
  },
  {
    key: "usuarios",
    path: "/usuarios",
    element: <EmConstrucao titulo="Usuários" />
  },
  {
    key: "ollama",
    path: "/ollama",
    element: ({ dataGridLocaleText }) => (
      <OllamaPesquisa localeText={dataGridLocaleText} />
    )
  }
];
