import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Icon } from "@iconify/react";
import logo from "./imagem/sidebar/logo.webp";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { menuGroups } from "../rotas/menuRoutes";

function Sidebar() {
  const theme = useTheme();
  const location = useLocation();

  const getActiveGroupId = () => {
    const activeGroup = menuGroups.find((group) =>
      group.items.some((item) => item.path === location.pathname)
    );
    return activeGroup ? activeGroup.id : null;
  };

  const [expandedGroup, setExpandedGroup] = useState(getActiveGroupId);

  useEffect(() => {
    const activeId = getActiveGroupId();
    if (!activeId) {
      return;
    }
    setExpandedGroup((prev) => (prev === activeId ? prev : activeId));
  }, [location.pathname]);

  const toggleGroup = (groupId) => {
    setExpandedGroup((prev) => (prev === groupId ? null : groupId));
  };

  const isGroupActive = (group) =>
    group.items.some((item) => item.path === location.pathname);

  return (
    <aside className={`sidebar ${theme.palette.mode}`}>
      
      {/*
      <div className="sidebar-window-controls" aria-hidden="true">
        <span className="sidebar-window-dot red" />
        <span className="sidebar-window-dot yellow" />
        <span className="sidebar-window-dot green" />
      </div>
       */}



      <div className=" sidebar-window-controls">
          <div className="sidebar-avatar">
          <img src={logo} alt="Logo da empresa" />
        </div>
        <span>MP PROJETOS</span>
      </div>


      {/*
      <div className="sidebar-profile">
        <div className="sidebar-avatar">
          <img src={logo} alt="Logo da empresa" />
        </div>
        <div className="sidebar-profile-info">
          <span className="sidebar-profile-name">MP Projetos</span>
          <span className="sidebar-profile-subtitle">Minha conta</span>
        </div>
        <button
          type="button"
          className="sidebar-profile-action"
          aria-label="Abrir menu da conta"
        >
          <Icon icon="mdi:chevron-down" width="18" height="18" />
        </button>
      </div>
             */}

      <div className="sidebar-divider" />

      <div className="sidebar-section-label">Menu</div>

      <nav className="sidebar-nav">
        {menuGroups.map((group, index) => (
          <div className="menu-category" key={group.id}>
            <button
              type="button"
              className={`menu-group-toggle ${isGroupActive(group) ? "active" : ""} ${expandedGroup === group.id ? "open" : ""}`}
              onClick={() => toggleGroup(group.id)}
              aria-expanded={expandedGroup === group.id}
              aria-controls={`menu-${group.id}`}
            >
              <span className="menu-group-label">{group.label}</span>
              <Icon
                icon="mdi:chevron-right"
                width="18"
                height="18"
                className="menu-group-chevron"
              />
            </button>

            <ul
              id={`menu-${group.id}`}
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
                      width="22"
                      height="22"
                      color="currentColor"
                      className="menu-icon"
                    />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {index < menuGroups.length - 1 && <div className="sidebar-divider" />}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
