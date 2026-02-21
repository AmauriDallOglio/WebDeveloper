import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./componentes/Header";
import Sidebar from "./componentes/Sidebar";
import Footer from "./componentes/Footer";
import Details from "./componentes/Details";
import Gallery from "./componentes/Galeria";
import Cliente from "./paginas/cliente/ClienteGrid";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-grid">
        <Header />
        <Sidebar />
        <main className="main-section-content">
          <Routes>
            <Route path="/" element={
              <>
                <section>
                  <h3>Saiba mais</h3>
                  <Details />
                </section>
                <section>
                  <h3>Galeria de imagem</h3>
                  <Gallery />
                </section>
              </>
            } />
            <Route path="/clientes" element={<Cliente />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

