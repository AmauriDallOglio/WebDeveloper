import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { clientes } from "../../integracao/clienteDados"; // caminho ajustado
import "./ClienteGrid.css";  // estilos específicos
 

 
 


function ClienteGrid() {
  const [filter, setFilter] = useState("");

  // Definição das colunas
  const columns = [
    { field: "codigo", headerName: "Código", width: 100 },
    { field: "nome", headerName: "Nome", width: 200 },
    { field: "idade", headerName: "Idade", width: 100 },
    { field: "dataNascimento", headerName: "Data Nasc.", width: 150 },
    { field: "sexo", headerName: "Sexo", width: 120 },
    { field: "peso", headerName: "Peso (kg)", width: 120 },
    { field: "altura", headerName: "Altura (m)", width: 120 },
    {
      field: "endereco",
      headerName: "Endereço",
      width: 300,
      valueGetter: (params) => {
        const e = params.row?.endereco;
        return e
          ? `${e.rua}, ${e.numero} - ${e.cidade}/${e.estado}`
          : "Endereço não informado";
      }
    }
  ];

  // Aplica filtro simples por nome
  const filteredData = (clientes || []).filter(cliente =>
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

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          getRowId={(row) => row.guid} // usa guid como ID único
        />
      </div>
    </div>
  );
}

export default ClienteGrid;
