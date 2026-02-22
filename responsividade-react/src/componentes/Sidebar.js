import React from "react";
import "./Sidebar.css";
 import { Icon } from "@iconify/react"; // biblioteca de ícones
import logo from "../imagem/sidebar/logo.webp";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Bloco da imagem e legenda */}
      <div className="sidebar-header">
        <img src={logo} alt="Logo da empresa" className="sidebar-logo" />
        <p className="sidebar-caption">MP ENGENHARIA</p>
      </div>

      {/* Categoria: Principal */}
      <div className="menu-category">
        <h3>Principal</h3>
        <ul className="menu">
          <li><Link to="/"><Icon icon="material-symbols-light:account-balance-outline" width="24" height="24" /> Início</Link></li>
          <li><Link to="/clientes"><Icon icon="material-symbols-light:person-outline" width="24" height="24" /> Clientes</Link></li>
        </ul>
      </div>

      {/* Categoria: Administração */}
      <div className="menu-category">
        <h3>Administração</h3>
        <ul className="menu">
          <li><Link to="/financeiro"><Icon icon="material-symbols-light:money-bag-outline" width="24" height="24" /> Financeiro</Link></li>
          <li><Link to="/usuarios"><Icon icon="material-symbols-light:account-box-outline" width="24" height="24" /> Usuários</Link></li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;

