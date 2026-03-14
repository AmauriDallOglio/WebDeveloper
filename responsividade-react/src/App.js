import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./componentes/masterPages/Header";
import Sidebar from "./componentes/masterPages/Sidebar";
import Footer from "./componentes/masterPages/Footer";
import { appRoutes } from "./rotas/menuRoutes";
import Login from "./paginas/login/Login";

import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ptBR as corePtBR, enUS as coreEnUS } from "@mui/material/locale";
import { CssBaseline } from "@mui/material";
import { ptBR as dataGridPtBR, enUS as dataGridEnUS } from "@mui/x-data-grid/locales";

function UnauthenticatedRoutes({ onLoginSuccess }) {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} />} />
      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
            state={{ from: location.pathname, unauthorized: true }}
          />
        }
      />
    </Routes>
  );
}

function App() {

  const [darkMode, setDarkMode] = useState(true);
  const [locale, setLocale] = useState("pt");
  /* Login */
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(localStorage.getItem("authToken"))
  );
  const [userName, setUserName] = useState(() =>
    localStorage.getItem("userName") || ""
  );
  const [notificationMessage, setNotificationMessage] = useState(() =>
    localStorage.getItem("notificationMessage") || ""
  );
  const dataGridLocaleText =
    (locale === "pt" ? dataGridPtBR : dataGridEnUS).components.MuiDataGrid
      .defaultProps.localeText;



/* ============================
npx create-react-app responsividade-react
cd responsividade
npm start

npm install react-router-dom

npm install @iconify/react

npm install @mui/x-data-grid @mui/material @emotion/react @emotion/styled

============================ */


   

  
  /* =====================================================
     Tema global do sistema
  ===================================================== */

  const theme = createTheme(
    {
      palette: {
        mode: darkMode ? "dark" : "light",

        background: {
          default: darkMode ? "#000000" : "#b2bac0",   // fundo geral 
          paper: darkMode ? "#111828" : "#ecf0f3"      // header / sidebar / footer
        },

        primary: {
          main:  darkMode ? "#00d4ff" : "#00d4ff",
        },

        text: {
          primary: darkMode ? "#ffffff" : "#000000",
          secondary: darkMode ? "#ffffff" : "#446A9C"
        },

        /* Borda do grid */
        divider: darkMode ? "#ffffff" : "#d6e1f2"
      },

      typography: {
        fontFamily: [
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif"
        ].join(",")
      }
    },
    locale === "pt" ? corePtBR : coreEnUS
  );


  /* Login */
  const handleLoginSuccess = ({ userName: loggedUserName, notification } = {}) => {
    setIsAuthenticated(true);
    if (loggedUserName) {
      setUserName(loggedUserName);
    }
    if (notification) {
      setNotificationMessage(notification);
    } else {
      setNotificationMessage("");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("notificationMessage");
    setIsAuthenticated(false);
    setUserName("");
    setNotificationMessage("");
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <UnauthenticatedRoutes onLoginSuccess={handleLoginSuccess} />
        </Router>
      </ThemeProvider>
    );
  }

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>

        <div className="app-grid">

          <Header
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            locale={locale}
            setLocale={setLocale}
            userName={userName}
            notificationMessage={notificationMessage}
            onLogout={handleLogout}
          />

          <Sidebar />

          <main className="details-body" 
          
                style={{ background: theme.palette.mode === "dark" ? 
                        "linear-gradient(270deg, #111828, #111828)" // fundo escuro 
                        : "linear-gradient(270deg, #ecf0f3, #ecf0f3)", // fundo claro 
                        color: theme.palette.mode === "dark" ? "#fff" : "#111", }} >



            <Routes>
              {appRoutes.map((route) => {
                const element =
                  typeof route.element === "function"
                    ? route.element({ dataGridLocaleText })
                    : route.element;

                return (
                  <Route
                    key={route.key}
                    path={route.path}
                    element={element}
                  />
                );
              })}
            </Routes>

          </main>

          <Footer />

        </div>

      </Router>

    </ThemeProvider>

  );
}

export default App;
