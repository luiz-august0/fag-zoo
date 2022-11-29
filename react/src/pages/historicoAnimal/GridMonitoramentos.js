import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { getMonitoramentos, createMonitoramento, updateMonitoramento, deleteMonitoramento } from "../../services/api";
import moment from 'moment';

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import FormDialog from "./DialogMonitoramentos.js";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AG_GRID_LOCALE_BR, flexOnOrNot } from "../../globalFunctions";

const GridMonitoramentos = () => {
    const initialValue = {historicoID: localStorage.getItem('historicoAnimalID'), tipo: "", hora: "", resultado: ""};

    const MySwal = withReactContent(Swal);
    
    const [gridApi, setGridApi] = useState(null);
    const [monitoramentos, setMonitoramentos] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState(initialValue);

    const columnDefs = [
        { field: "HsMo_Codigo", headerName: "Código", hide: true},
        { field: "HsAni_Codigo", headerName: "Código do Histórico", hide: true},
        { field: "Monitoracao", headerName: "Monitoração"},
        { field: "HsMo_Tipo", headerName: "Monitoração", hide: true},
        { field: "HsMo_Hora", headerName: "Horário"},
        { field: "HsMo_Result", headerName: "Resultado"},
        { field: "HsMo_Codigo", headerName:"Ações", cellRendererFramework:(params) => 
        <div>
            <Button variant="outlined" color="primary" onClick={() => handleUpdate(params.data)}>Editar</Button>
            <Button variant="outlined" color="secondary" onClick={() => handleDelete(params.value)}>Excluir</Button>
        </div>}
    ];

    const defaultColDef = {
        sortable: true,
        filter: true,
        floatingFilter: true,
        resizable: true,
        flex: 1
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setFormData(initialValue);
    }
    
    const refreshGrid = async () => {
        const response = await getMonitoramentos(localStorage.getItem('historicoAnimalID'));
        setMonitoramentos(response.data);
    }

    useEffect(() => {
        refreshGrid();
    }, []);

    const onChange = (e) => {
        const {value, id} = e.target;
        setFormData({...formData,[id]:value})
    }

    const onGridReady = (params) => {
        setGridApi(params);
    }

    //Insere registro //Atualiza registro
    const handleFormSubmit = async () => {
        const historicoID = formData.historicoID;
        const tipo = formData.tipo;
        const hora = formData.hora;
        const resultado = formData.resultado;

        if(formData.id) {
            try {            
                await updateMonitoramento(formData.id, tipo, hora, resultado);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Monitoramento alterado com sucesso!</i>,
                    icon: 'success'
                })
            } catch (error) {
                handleClose();
                MySwal.fire({
                    html: <i>{JSON.stringify(error.response.data).slice(0, -1).slice(1 | 1)}</i>,
                    icon: 'error'
                })
            }
        }else {
            try {           
                await createMonitoramento(historicoID, tipo, hora, resultado);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Monitoramento cadastrado com sucesso!</i>,
                    icon: 'success'
                })
            } catch (error) {
                handleClose();
                MySwal.fire({
                    html: <i>{JSON.stringify(error.response.data).slice(0, -1).slice(1 | 1)}</i>,
                    icon: 'error'
                })
            }
        }
    }

    const handleUpdate = (oldData) => {
        setFormData({
            historicoID: oldData.HsAni_Codigo,
            tipo: oldData.HsMo_Tipo, 
            hora: oldData.HsMo_Hora, 
            resultado: oldData.HsMo_Result,
            id: oldData.HsMo_Codigo});
        handleClickOpen();
    }

    //Deleta registro
    const handleDelete = (id) => {
        const deleteRegister = async () => {
            try {
                await deleteMonitoramento(id);
                MySwal.fire({
                    html: <i>Monitoramento excluido com sucesso!</i>,
                    icon: 'success'
                })
                refreshGrid();
            } catch (error) {
                MySwal.fire({
                    html: <i>{JSON.stringify(error.response.data.error).slice(0, -1).slice(1 | 1)}</i>,
                    icon: 'error'
                })
            }
        }

        MySwal.fire({
            title: 'Confirma a exclusão do monitoramento?',
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
                deleteRegister();
            }
        })
    }

    return (
        <div className="Grid"> 
            <h2>Monitoramentos</h2>
            <Grid align="right" marginBottom={1}>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>Adicionar</Button>
            </Grid>
            <div className="ag-theme-alpine" style={{ height: '400px' }}>
                <AgGridReact 
                    rowData={monitoramentos}
                    columnDefs={columnDefs} 
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    localeText={AG_GRID_LOCALE_BR}
                    gridOptions={{paginationAutoPageSize: true,pagination: true}}
                />
            </div>
            <FormDialog
            open={open} 
            handleClose={handleClose} 
            data={formData} 
            onChange={onChange} 
            handleFormSubmit={handleFormSubmit}
            />
        </div>
    )
}

export default GridMonitoramentos;