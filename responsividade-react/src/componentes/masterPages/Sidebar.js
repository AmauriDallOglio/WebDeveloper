 import React from "react";
import "./Sidebar.css";
import { Icon } from "@iconify/react";
import logo from "./imagem/sidebar/logo.webp";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function Sidebar({ darkMode }) {
  const theme = useTheme();

  // Define cor dos ícones conforme o tema
  const iconColor = theme.palette.mode === "dark" ? "#ffffff" : "#000000";

  return (
    <aside
      className={`sidebar ${theme.palette.mode}`}

      style={{
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(270deg, #111828, #111828)"
            : "linear-gradient(270deg, #f6f3f3, #e5e7eb)",
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
      }}


    >
      <div className="sidebar-header">
        <img src={logo} alt="Logo da empresa" className="sidebar-logo" />
        <p className="sidebar-caption">MP PROJETOS</p>
      </div>

      <div className="menu-category">
        <p className="sidebar-caption-menu">Principal</p>
        <ul className="menu">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              <Icon icon="material-symbols-light:account-balance-outline" width="24" height="24" color={iconColor} /> Início
            </NavLink>
          </li>
          <li>
            <NavLink to="/clientes" className={({ isActive }) => (isActive ? "active" : "")}>
              <Icon icon="material-symbols-light:person-outline" width="24" height="24" color={iconColor} /> Clientes
            </NavLink>
          </li>
          <li>
            <NavLink to="/contato" className={({ isActive }) => (isActive ? "active" : "")}>
              <Icon icon="mdi:email-outline" width="24" height="24" color={iconColor} /> Contato
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="menu-category">
        <p className="sidebar-caption-menu">Administração</p>
        <ul className="menu">
          <li>
            <NavLink to="/financeiro" className={({ isActive }) => (isActive ? "active" : "")}>
              <Icon icon="material-symbols-light:money-bag-outline" width="24" height="24" color={iconColor} /> Financeiro
            </NavLink>
          </li>
          <li>
            <NavLink to="/usuarios" className={({ isActive }) => (isActive ? "active" : "")}>
              <Icon icon="material-symbols-light:account-box-outline" width="24" height="24" color={iconColor} /> Usuários
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
