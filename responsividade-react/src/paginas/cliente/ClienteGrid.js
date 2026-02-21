import React, { useState } from "react";
import { clientes } from "../../integracao/clienteDados";
import "./ClienteGrid.css";  // Estilos específicos para a página de clientes

function Cliente() {
  const [filter, setFilter] = useState("");

  const filteredData = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="details">
      <h2>Lista de Clientes</h2>
      <input
        type="text"
        placeholder="Filtrar por nome..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="grid">
        {filteredData.map((cliente) => (
          <div key={cliente.guid} className="card">
            <h3>{cliente.nome}</h3>
            <p><strong>Código:</strong> {cliente.codigo}</p>
            <p><strong>Idade:</strong> {cliente.idade}</p>
            <p><strong>Data Nasc.:</strong> {cliente.dataNascimento}</p>
            <p><strong>Sexo:</strong> {cliente.sexo}</p>
            <p><strong>Peso:</strong> {cliente.peso} kg</p>
            <p><strong>Altura:</strong> {cliente.altura} m</p>
            <hr />
            <p><strong>Endereço:</strong></p>
            <p>{cliente.endereco.rua}, {cliente.endereco.numero}</p>
            <p>{cliente.endereco.bairro} - {cliente.endereco.cidade}/{cliente.endereco.estado}</p>
            <p>CEP: {cliente.endereco.cep}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cliente;   // <-- precisa ser default
