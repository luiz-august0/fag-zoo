import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { getAnimais, createAnimal, updateAnimal, deleteAnimal } from "../../services/api";

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import FormDialog from "./Dialog";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { mobileDetect } from "../../globalFunctions";

const initialValue = {ani_nome: "", ani_nomecient: "", ani_apelido: "", ani_identificacao: "", ani_sexo: "", ani_origem: ""};

const GridAnimal = () => {

    const MySwal = withReactContent(Swal);
    
    const [gridApi, setGridApi] = useState(null);
    const [animais, setAnimais] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState(initialValue);

    const columnDefs = [
        { field: "Ani_Codigo", headerName: "Código", width: 180},
        { field: "Ani_Nome", headerName: "Nome" },
        { field: "Ani_NomeCient", headerName: "Nome Científico", hide: mobileDetect()},
        { field: "Ani_Apelido", headerName: "Apelido", hide: mobileDetect()},
        { field: "Ani_Identificacao", headerName: "Identificação"},
        { field: "Ani_Sexo", headerName: "Sexo" },
        { field: "Ani_Origem", headerName: "Origem", hide: mobileDetect() },
        { field: "Ani_Codigo", headerName:"Ações", cellRendererFramework:(params) => 
        <div>
            <Button variant="outlined" color="primary" onClick={() => handleUpdate(params.data)}>Editar</Button>
            <Button variant="outlined" color="secondary" onClick={() => handleDelete(params.value)}>Excluir</Button>
        </div>}
    ];

    const defaultColDef = {
        sortable: true,
        filter: true,
        floatingFilter: true,
        resizable: true
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setFormData(initialValue);
    }
    
    const refreshGrid = async () => {
        const response = await getAnimais();
        setAnimais(response.data);
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

    //Insere registro //Atualiza registro
    const handleFormSubmit = async () => {
        const ani_nome = formData.ani_nome;
        const ani_nomecient = formData.ani_nomecient;
        const ani_apelido = formData.ani_apelido;
        const ani_identificacao = formData.ani_identificacao;
        const ani_sexo = formData.ani_sexo;
        const ani_origem = formData.ani_origem;

        if(formData.id) {
            try {            
                await updateAnimal(ani_nome, ani_nomecient, ani_apelido, ani_identificacao, ani_sexo, ani_origem, formData.id);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Animal alterado com sucesso!</i>,
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
                await createAnimal(ani_nome, ani_nomecient, ani_apelido, ani_identificacao, ani_sexo, ani_origem);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Animal cadastrado com sucesso!</i>,
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
            ani_nome: oldData.Ani_Nome, 
            ani_nomecient: oldData.Ani_NomeCient, 
            ani_apelido: oldData.Ani_Apelido, 
            ani_identificacao: oldData.Ani_Identificacao, 
            ani_sexo: oldData.Ani_Sexo, 
            ani_origem: oldData.Ani_Origem, 
            id: oldData.Ani_Codigo});
        handleClickOpen();
    }

    //Deleta registro
    const handleDelete = (id) => {
        const deleteRegister = async () => {
            try {
                await deleteAnimal(id);
                MySwal.fire({
                    html: <i>Animal excluido com sucesso!</i>,
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
            title: 'Confirma a exclusão do animal?',
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
                    rowData={animais}
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
            />
        </div>
    )
}

export default GridAnimal;