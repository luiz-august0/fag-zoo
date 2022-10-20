import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { showNutricao, createNutricao, updateNutricao, deleteNutricao } from "../../services/api";

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import FormDialog from "./Dialog";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AG_GRID_LOCALE_BR, flexOnOrNot } from "../../globalFunctions";

const GridNutricao = (animalID) => {
    const initialValue = {ani_codigo : animalID.animalID, ntr_dia : "", ntr_hora : "", ntr_alimento : "", ntr_unmed : "", ntr_qtd : "", ntr_obs : ""};

    const MySwal = withReactContent(Swal);
    
    const [gridApi, setGridApi] = useState(null);
    const [nutricoes, setNutricoes] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState(initialValue);

    const columnDefs = [
        { field: "NtrAni_Codigo", headerName: "Código", hide: true},
        { field: "Ani_Codigo", headerName: "Código do Animal", hide: true},
        { field: "NtrAni_Dia", headerName: "Dia"},
        { field: "NtrAni_Hora", headerName: "Hora"},
        { field: "NtrAni_Alimen", headerName: "Alimento"},
        { field: "NtrAni_UnMed", headerName: "Unidade" },
        { field: "NtrAni_Qtd", headerName: "Quantidade" },
        { field: "NtrAni_Obs", headerName: "Observação" },
        { field: "NtrAni_Codigo", headerName:"Ações", cellRendererFramework:(params) => 
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
        flex: flexOnOrNot()
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setFormData(initialValue);
    }
    
    const refreshGrid = async () => {
        const response = await showNutricao(animalID.animalID);
        setNutricoes(response.data);
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
        const ani_codigo = formData.ani_codigo;
        const ntr_dia = formData.ntr_dia;
        const ntr_hora = formData.ntr_hora;
        const ntr_alimento = formData.ntr_alimento;
        const ntr_unmed = formData.ntr_unmed;
        const ntr_qtd = formData.ntr_qtd;
        const ntr_obs = formData.ntr_obs;

        if(formData.id) {
            try {            
                await updateNutricao(formData.id, ntr_dia, ntr_hora, ntr_alimento, ntr_unmed, ntr_qtd, ntr_obs);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Refeição alterada com sucesso!</i>,
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
                await createNutricao(ani_codigo, ntr_dia, ntr_hora, ntr_alimento, ntr_unmed, ntr_qtd, ntr_obs);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Refeição cadastrada com sucesso!</i>,
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
            ani_codigo: oldData.Ani_Codigo, 
            ntr_dia: oldData.NtrAni_Dia, 
            ntr_hora: oldData.NtrAni_Hora, 
            ntr_alimento: oldData.NtrAni_Alimen, 
            ntr_unmed: oldData.NtrAni_UnMed,
            ntr_qtd: oldData.NtrAni_Qtd, 
            ntr_obs: oldData.NtrAni_Obs,
            id: oldData.NtrAni_Codigo});
        handleClickOpen();
    }

    //Deleta registro
    const handleDelete = (id) => {
        const deleteRegister = async () => {
            try {
                await deleteNutricao(id);
                MySwal.fire({
                    html: <i>Refeição excluida com sucesso!</i>,
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
            title: 'Confirma a exclusão da refeição?',
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
            <Grid align="right" marginBottom={1}>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>Adicionar</Button>
            </Grid>
            <div className="ag-theme-alpine" style={{ height: '400px'}}>
                <AgGridReact 
                    rowData={nutricoes}
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

export default GridNutricao;