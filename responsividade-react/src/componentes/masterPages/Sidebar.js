import React, { useState } from "react";
import "./Sidebar.css";
import { Icon } from "@iconify/react";
import logo from "./imagem/sidebar/logo.webp";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { menuGroups } from "../../rotas/menuRoutes";

function Sidebar() {
  const theme = useTheme();
  const location = useLocation();

  const [expandedGroup, setExpandedGroup] = useState(null);

  const toggleGroup = (groupId) => {
    setExpandedGroup((prev) => (prev === groupId ? null : groupId));
  };

  const isGroupActive = (group) =>
    group.items.some((item) => item.path === location.pathname);

  return (
    <aside
      className={`sidebar ${theme.palette.mode}`}
      style={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary
      }}
    >
      {/* ============================
          Cabeçalho
      ============================ */}

      <div className="sidebar-header">
        <img
          src={logo}
          alt="Logo da empresa"
          className="sidebar-logo"
        />

        <p className="sidebar-caption">
          MP PROJETOS
        </p>
      </div>

      {menuGroups.map((group) => (
        <div className="menu-category" key={group.id}>
          <button
            className={`sidebar-group-toggle ${theme.palette.mode} ${isGroupActive(group) ? "active" : ""}`}
            onClick={() => toggleGroup(group.id)}
            aria-expanded={expandedGroup === group.id}
          >
            <span className="sidebar-caption-menu">
              {group.label}
            </span>

            <Icon
              icon={
                expandedGroup === group.id
                  ? "mdi:chevron-down"
                  : "mdi:chevron-right"
              }
              width="18"
              height="18"
              color="currentColor"
              className="sidebar-chevron"
            />
          </button>

          <ul
            className={`menu collapsible ${expandedGroup === group.id ? "open" : ""}`}
          >
            {group.items.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <Icon
                    icon={item.icon}
                    width="24"
                    height="24"
                    color="currentColor"
                  />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;
