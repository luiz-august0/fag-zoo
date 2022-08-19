import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { getUsuarios, createUsuario, deleteUsuario } from "../../services/api";

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import FormDialog from "./Dialog";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const initialValue = {usuario: "", senha: "", setor: ""};

const GridUsuario = () => {

    const MySwal = withReactContent(Swal);
    
    const [gridApi, setGridApi] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState(initialValue);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    const refreshGrid = async () => {
        const response = await getUsuarios();
        setUsuarios(response.data);
    }

    useEffect(() => {
        refreshGrid();
    }, []);

    const onChange = (e) => {
        const {value, id} = e.target;
        setFormData({...formData,[id]:value})
    }

    const onGridReady = (params) => {
        setGridApi(params)
    }

    const handleFormSubmit = async () => {
        try {            
            const usuario = formData.usuario;
            const senha = formData.senha;
            const setor = formData.setor;
            
            await createUsuario(usuario, senha, setor);
            refreshGrid();
            handleClose();
            setFormData(initialValue);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        await MySwal.fire({
            title: 'Confirma a exclusão do usuário?',
            showDenyButton: true,
            confirmButtonText: 'Sim',
            denyButtonText: 'Não',
            customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
            }
          }).then((result) => {
            if (result.isConfirmed) {
                try {
                    deleteUsuario(id);
                } catch (error) {
                    console.log('aqui');
                }
            }
            refreshGrid();
        })
    }

    const columnDefs = [
        { field: "Usr_Codigo", headerName: "Código Usuário", hide:true},
        { field: "Usr_Login", headerName: "Usuário" },
        { field: "Str_Codigo", headerName: "Código Setor"},
        { field: "Str_Descricao", headerName: "Setor" },
        { field: "Usr_Codigo", headerName:"Ações", cellRendererFramework:(params) => 
        <div>
            <Button variant="outlined" color="primary">Editar</Button>
            <Button variant="outlined" color="secondary" onClick={() => handleDelete(params.value)}>Excluir</Button>
        </div>}
    ];

    const defaultColDef = {
        sortable: true,
        flex: 1, filter: true,
        floatingFilter: true
    }

    return (
        <div className="Grid"> 
            <Grid align="right" marginBottom={1}>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>Adicionar</Button>
            </Grid>
            <div className="ag-theme-alpine" style={{ height: '400px'}}>
                <AgGridReact 
                    rowData={usuarios}
                    columnDefs={columnDefs} 
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                />
            </div>
            <FormDialog open={open} handleClose={handleClose} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
        </div>
    )
}

export default GridUsuario;