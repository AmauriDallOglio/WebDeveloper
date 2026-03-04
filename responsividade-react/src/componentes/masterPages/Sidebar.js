import React, { useState } from "react";
import "./Sidebar.css";
import { Icon } from "@iconify/react";
import logo from "./imagem/sidebar/logo.webp";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function Sidebar({ darkMode }) {
  const theme = useTheme();
  const iconColor = theme.palette.mode === "dark" ? "#ffffff" : "#000000";

  // Controla qual grupo está expandido (null = todos fechados)
  const [expandedGroup, setExpandedGroup] = useState(null);

  const toggleGroup = (groupId) => {
    setExpandedGroup((prev) => (prev === groupId ? null : groupId));
  };

  return (
    <aside
      className={`sidebar ${theme.palette.mode}`}
      style={{
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(90deg, #111828, #111828)"
            : "linear-gradient(270deg, #e5e7eb, #e5e7eb)",
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
      }}
    >
      {/* ── Cabeçalho ── */}
      <div className="sidebar-header">
        <img src={logo} alt="Logo da empresa" className="sidebar-logo" />
        <p className="sidebar-caption">MP PROJETOS</p>
      </div>

      {/* ── Principal ── */}
      <div className="menu-category">
        <button
          className={`sidebar-group-toggle ${theme.palette.mode}`}
          onClick={() => toggleGroup("principal")}
          aria-expanded={expandedGroup === "principal"}
        >
          <span className="sidebar-caption-menu">Principal</span>
          <Icon
            icon={
              expandedGroup === "principal"
                ? "mdi:chevron-down"
                : "mdi:chevron-right"
            }
            width="18"
            height="18"
            color="#9ca3af"
            className="sidebar-chevron"
          />
        </button>

        <ul
          className={`menu collapsible ${
            expandedGroup === "principal" ? "open" : ""
          }`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Icon
                icon="material-symbols-light:account-balance-outline"
                width="24"
                height="24"
                color={iconColor}
              />
              Início
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clientes"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Icon
                icon="material-symbols-light:person-outline"
                width="24"
                height="24"
                color={iconColor}
              />
              Clientes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contato"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Icon
                icon="mdi:email-outline"
                width="24"
                height="24"
                color={iconColor}
              />
              Contato
            </NavLink>
          </li>
        </ul>
      </div>

      {/* ── Administração ── */}
      <div className="menu-category">
        <button
          className={`sidebar-group-toggle ${theme.palette.mode}`}
          onClick={() => toggleGroup("administracao")}
          aria-expanded={expandedGroup === "administracao"}
        >
          <span className="sidebar-caption-menu">Administração</span>
          <Icon
            icon={
              expandedGroup === "administracao"
                ? "mdi:chevron-down"
                : "mdi:chevron-right"
            }
            width="18"
            height="18"
            color="#9ca3af"
            className="sidebar-chevron"
          />
        </button>

        <ul
          className={`menu collapsible ${
            expandedGroup === "administracao" ? "open" : ""
          }`}
        >
          <li>
            <NavLink
              to="/financeiro"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Icon
                icon="material-symbols-light:money-bag-outline"
                width="24"
                height="24"
                color={iconColor}
              />
              Financeiro
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/usuarios"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Icon
                icon="material-symbols-light:account-box-outline"
                width="24"
                height="24"
                color={iconColor}
              />
              Usuários
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
