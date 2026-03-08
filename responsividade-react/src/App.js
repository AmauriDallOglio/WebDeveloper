import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./componentes/masterPages/Header";
import Sidebar from "./componentes/masterPages/Sidebar";
import Footer from "./componentes/masterPages/Footer";
import Details from "./componentes/masterPages/Details";

import Cliente from "./paginas/cliente/ClienteGrid";
import ClienteCadastro from "./paginas/cliente/ClienteCadastro";

import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

function App() {

  const [darkMode, setDarkMode] = useState(true);



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

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",

      background: {
        default: darkMode ? "#000000" : "#ffffff",   // fundo geral
        paper: darkMode ? "#111828" : "#f1faff"      // header / sidebar / footer
      },

      primary: {
        main: "#f2ff00"
      },

      text: {
        primary: darkMode ? "#ffffff" : "#111827"
      }
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
  });

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>

        <div className="app-grid">

          <Header darkMode={darkMode} setDarkMode={setDarkMode} />

          <Sidebar />

          <main className="details-body" style={{ background: theme.palette.mode === "dark" ? "linear-gradient(270deg, #111828, #111828)" // fundo escuro 
             : "linear-gradient(270deg, #e5e7eb, #f1faff)", // fundo claro 
             color: theme.palette.mode === "dark" ? "#fff" : "#111", }} >

            <Routes>

              <Route
                path="/"
                element={
                  <section>
                    <h3>Saiba mais</h3>
                    <Details />
                  </section>
                }
              />

              <Route path="/clientes" element={<Cliente />} />

              <Route path="/contato" element={<ClienteCadastro />} />

            </Routes>

          </main>

          <Footer />

        </div>

      </Router>

    </ThemeProvider>

  );
}

export default App;