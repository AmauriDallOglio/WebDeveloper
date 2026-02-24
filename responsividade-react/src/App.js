import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./componentes/Header";
import Sidebar from "./componentes/Sidebar";
import Footer from "./componentes/Footer";
import Details from "./componentes/Details";
import Cliente from "./paginas/cliente/ClienteGrid";
import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import ClienteCadastro from "./paginas/cliente/ClienteCadastro";


/* ============================
npx create-react-app responsividade-react
cd responsividade
npm start

npm install react-router-dom

npm install @iconify/react

npm install @mui/x-data-grid @mui/material @emotion/react @emotion/styled

   ============================ */


   
function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app-grid">
          
          {/* Passa darkMode e setDarkMode para o Header */}
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />

          <Sidebar />

          <main className="details-body">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <section>
                      <h3>Saiba mais</h3>
                      <Details />
                    </section>
                  </>
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
