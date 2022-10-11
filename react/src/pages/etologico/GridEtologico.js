import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { showEtologico, createEtologico, updateEtologico, deleteEtologico } from "../../services/api";
import moment from 'moment';

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import FormDialog from "./Dialog";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { flexOnOrNot } from "../../globalFunctions";

const GridEtologico = (animalID) => {
    const initialValue = {codigoAni : animalID.animalID, comp: "", outrComp: "", obs: "", dataHist: "", hora: "", resp: ""};

    const MySwal = withReactContent(Swal);
    
    const [gridApi, setGridApi] = useState(null);
    const [etologicos, setEtologicos] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState(initialValue);

    const columnDefs = [
        { field: "HsEt_Codigo", headerName: "Código", hide: true},
        { field: "Ani_Codigo", headerName: "Código do Animal", hide: true},
        { field: "HsEt_Comp", headerName: "Comportamento"},
        { field: "HsEt_OutrComp", headerName: "Outros Comportamentos"},
        { field: "HsEt_Obs", headerName: "Observação"},
        { field: "HsEt_Data", headerName: "Data", filter: 'agDateColumnFilter',
         valueFormatter: function (params) { return moment(params.data.HsEt_Data).format('DD/MM/YYYY')},
         filterParams: {
            debounceMs: 500,
            suppressAndOrCondition: true,
            comparator: function(filterLocalDateAtMidnight, cellValue) {
              if (cellValue == null) {
                return 0;
              }
              var cellValueFormated = moment(cellValue).format('DD/MM/YYYY');
              var dateParts = cellValueFormated.split('/');
              var year = Number(dateParts[2]);
              var month = Number(dateParts[1]) - 1;
              var day = Number(dateParts[0]);
              var cellDate = new Date(year, month, day);
    
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              } else if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              } else {
                return 0;
              }
            }
        }},
        { field: "HsEt_Hora", headerName: "Hora" },
        { field: "HsEt_Codigo", headerName:"Ações", cellRendererFramework:(params) => 
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
        const response = await showEtologico(animalID.animalID);
        setEtologicos(response.data);
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
        const codigoAni = formData.codigoAni;
        const comp = formData.comp;
        const outrComp = formData.outrComp;
        const obs = formData.obs;
        const dataHist = formData.dataHist;
        const hora = formData.hora;
        const resp = formData.resp;

        if(formData.id) {
            try {            
                await updateEtologico(formData.id, comp, outrComp, obs, dataHist, hora, resp);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Histórico alterado com sucesso!</i>,
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
                await createEtologico(codigoAni, comp, outrComp, obs, dataHist, hora, resp);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Histórico cadastrado com sucesso!</i>,
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
            codigoAni: oldData.Ani_Codigo, 
            comp: oldData.HsEt_Comp, 
            outrComp: oldData.HsEt_OutrComp, 
            obs: oldData.HsEt_Obs, 
            dataHist: moment(oldData.HsEt_Data).format('YYYY-MM-DD'),
            hora: oldData.HsEt_Hora, 
            resp: oldData.HsEt_Resp,
            id: oldData.HsEt_Codigo});
        handleClickOpen();
    }

    //Deleta registro
    const handleDelete = (id) => {
        const deleteRegister = async () => {
            try {
                await deleteEtologico(id);
                MySwal.fire({
                    html: <i>Histórico excluido com sucesso!</i>,
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
            title: 'Confirma a exclusão do histórico?',
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
                    rowData={etologicos}
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

export default GridEtologico;