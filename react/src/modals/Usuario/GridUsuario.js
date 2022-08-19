import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { api, getUsuarios } from "../../services/api";

const GridUsuario = () => {
    
    const [usuarios, setUsuarios] = useState([]);
    
    const refreshGrid = async () => {
        const response = await getUsuarios();
        setUsuarios(response.data);
    }

    useEffect(() => {
        refreshGrid();
    }, []);

    const columns = [
        { Field: "Usr_Codigo", headerName: "Cod Usuário", hide: true },
        { Field: "Usr_Login", headerName: "Usuário", width: 50 },
        { Field: "Usr_Senha", headerName: "Senha", with: 50 },
        { Field: "Str_Codigo", headerName: "Cod Setor", hide: true },
        { Field: "Str_Descricao", headerName: "Setor", width: 30 }
    ];

    return (
        <div style={{ height: 300, width: "100%" }}>
            <DataGrid 
            rows={usuarios}
            columns={columns} 
            getRowId={(row) => row.Usr_Codigo}
            key={(row) => row.Usr_Codigo}
            />
        </div>
    )
}

export default GridUsuario;