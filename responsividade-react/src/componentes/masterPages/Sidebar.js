 // src > componentes > masterPages > Sidebar.Js

import React from "react";
import "./Sidebar.css";
import { Icon } from "@iconify/react";
import logo from "./imagem/sidebar/logo.webp";
import { NavLink } from "react-router-dom"; // troque Link por NavLink

function Sidebar() {
  return (
    <aside className="sidebar">
 
      {/* Bloco da imagem e legenda */}
      <div className="sidebar-header">
        <img src={logo} alt="Logo da empresa" className="sidebar-logo" />
        <p className="sidebar-caption">MP PROJETOS</p>
      </div>

      {/* Categoria: Principal */}
      <div className="menu-category">
        <p className="sidebar-caption-menu">Principal</p>
        <ul className="menu">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              <Icon icon="material-symbols-light:account-balance-outline" width="24" height="24" /> Início
            </NavLink>
          </li>
          <li>
            <NavLink to="/clientes" className={({ isActive }) => (isActive ? "active" : "")}>
              <Icon icon="material-symbols-light:person-outline" width="24" height="24" /> Clientes
            </NavLink>
          </li>

          <li>
            <NavLink to="/contato" className={({ isActive }) => (isActive ? "active" : "")}>
              <Icon icon="mdi:email-outline" width="24" height="24" /> Contato
            </NavLink>
          </li>



        </ul>
      </div>

      {/* Categoria: Administração */}
      <div className="menu-category">
        <p className="sidebar-caption-menu">Administração</p>
        <ul className="menu">
          <li>
            <NavLink to="/financeiro" className={({ isActive }) => (isActive ? "active" : "")}>
              <Icon icon="material-symbols-light:money-bag-outline" width="24" height="24" /> Financeiro
            </NavLink>
          </li>
          <li>
            <NavLink to="/usuarios" className={({ isActive }) => (isActive ? "active" : "")}>
              <Icon icon="material-symbols-light:account-box-outline" width="24" height="24" /> Usuários
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;

