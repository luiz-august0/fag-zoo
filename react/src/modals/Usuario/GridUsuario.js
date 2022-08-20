import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from "../../services/api";

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
    const [showMsgWarning, SetShowMsgWarning] = React.useState(false);

    const columnDefs = [
        { field: "Usr_Codigo", headerName: "Código Usuário", hide:true},
        { field: "Usr_Login", headerName: "Usuário" },
        { field: "Str_Codigo", headerName: "Código Setor"},
        { field: "Str_Descricao", headerName: "Setor" },
        { field: "Usr_Codigo", headerName:"Ações", cellRendererFramework:(params) => 
        <div>
            <Button variant="outlined" color="primary" onClick={() => handleUpdate(params.data)}>Editar</Button>
            <Button variant="outlined" color="secondary" onClick={() => handleDelete(params.value)}>Excluir</Button>
        </div>}
    ];

    const defaultColDef = {
        sortable: true,
        flex: 1, filter: true,
        floatingFilter: true
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setFormData(initialValue);
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

    //Insere registro
    const handleFormSubmit = async () => {
        const usuario = formData.usuario;
        const senha = formData.senha;
        const setor = formData.setor;
        
        if (usuario === '' || senha === '' || setor === '') {
            SetShowMsgWarning(true);
            return;
        }

        if(formData.id) {
            try {            
                await updateUsuario(usuario, senha, setor, formData.id);
                refreshGrid();
                handleClose();
            } catch (error) {
                console.log(error);
            }
        }else {
            try {           
                await createUsuario(usuario, senha, setor);
                refreshGrid();
                handleClose();
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleUpdate = (oldData) => {
        const data = [oldData.Usr_Login, oldData.Usr_Senha, oldData.Str_Codigo];
        setFormData({usuario: oldData.Usr_Login, senha: "", setor: oldData.Str_Codigo, id: oldData.Usr_Codigo});
        handleClickOpen();
    }

    //Deleta registro
    const handleDelete = (id) => {
        const deleteRegister = () => {
            try {
                deleteUsuario(id);
            } catch (error) {
                console.log('aqui');
            }
            refreshGrid();
        }

        MySwal.fire({
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
                deleteRegister()
            }
        })
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
            <FormDialog
            open={open} 
            handleClose={handleClose} 
            data={formData} 
            onChange={onChange} 
            handleFormSubmit={handleFormSubmit}
            showMsgWarning={showMsgWarning}
            />
        </div>
    )
}

export default GridUsuario;