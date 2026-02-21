import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/">Início</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>

      </ul>
    </nav>
  );
}

export default Sidebar;
