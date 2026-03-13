import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { clientes } from "../../integracao/clienteDados";
import "./ClienteGrid.css";

function ClienteGrid({ localeText }) {

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [search, setSearch] = useState("");
  const filteredClientes = clientes.filter((c) =>
    c.nome.toLowerCase().includes(search.toLowerCase())
  );
  const [rowSelectionModel, setRowSelectionModel] = useState({
    type: "include",
    ids: new Set()
  });
  const selectedCount = rowSelectionModel?.type === "exclude"
    ? Math.max(filteredClientes.length - (rowSelectionModel?.ids?.size ?? 0), 0)
    : (rowSelectionModel?.ids?.size ?? 0);

  const columns = [
    { field: "codigo", headerName: "Código", width: 100 },
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "idade", headerName: "Idade", width: 100 },
    { field: "sexo", headerName: "Sexo", width: 100 },
    {
      field: "editar",
      headerName: "Editar",
      width: 80,
      sortable: false,
      renderCell: () => (
        <Icon icon="mdi:pencil-outline" width="18" color="#00d4ff" />
      )
    }
  ];

  return (
    <div className={`cliente-container ${isDark ? "dark" : "light"}`}>

      {/* HEADER */}
      <div className="cliente-header">

        <div className="cliente-icon">
          <Icon icon="mdi:account-outline" width="20" color="#00d4ff" />
        </div>

        <h1 className="cliente-title">
          Clientes
        </h1>

      </div>


      {/* TOOLBAR */}
      <div className="cliente-toolbar">

        <button className="btn-primary">
          <Icon icon="mdi:plus" width="16" />
          INCLUIR
        </button>

        <button
          className={`btn-secondary ${selectedCount ? "is-delete" : ""}`}
          disabled={selectedCount === 0}
        >
          <Icon icon="mdi:delete-outline" width="16" />
          EXCLUIR
        </button>

        <button
          className={`btn-secondary ${selectedCount ? "is-copy" : ""}`}
          disabled={selectedCount === 0}
        >
          <Icon icon="mdi:content-copy" width="16" />
          COPIAR
        </button>


        {/* PESQUISA */}
        <div className="cliente-search">

          <Icon icon="mdi:magnify" width="16" />

          <input
            placeholder="Pesquisar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>


      {/* GRID */}
      <div className={`cliente-container ${isDark ? "dark" : "light"}`}>

        <div className="cliente-grid">

          <DataGrid
            rows={filteredClientes}
            columns={columns}
            getRowId={(row) => row.guid}
            pageSize={10}
            rowsPerPageOptions={[10,25,50]}
            checkboxSelection
            disableRowSelectionOnClick
            className="cliente-datagrid"
            localeText={localeText}
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={(newSelection) =>
              setRowSelectionModel(newSelection)
            }
          />

        </div>

      </div>

    </div>
  );
}

export default ClienteGrid;
