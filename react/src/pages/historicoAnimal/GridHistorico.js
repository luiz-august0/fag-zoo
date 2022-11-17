import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { showEtologico, deleteEtologico } from "../../services/api";
import moment from 'moment';

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AG_GRID_LOCALE_BR, flexOnOrNot } from "../../globalFunctions";
import { useNavigate } from "react-router-dom";

const GridHistorico = (animalID) => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [gridApi, setGridApi] = useState(null);
    const [historicos, setHistoricos] = useState([]);

    const columnDefs = [
        { field: "HsEt_Codigo", headerName: "Código", hide: true},
        { field: "Ani_Codigo", headerName: "Código do Animal", hide: true},
        { field: "HsEt_Comp", headerName: "Comportamento"},
        { field: "HsEt_OutrComp", headerName: "Outros Comportamentos"},
        { field: "HsEt_Obs", headerName: "Observação"},
        { field: "HsEt_Resp", headerName: "Responsável"},
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
            <Button variant="outlined" color="primary">Editar</Button>
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
    
    const refreshGrid = async () => {
        const response = await showEtologico(animalID.animalID);
        setHistoricos(response.data);
    }

    useEffect(() => {
        refreshGrid();
    }, []);

    const onGridReady = (params) => {
        setGridApi(params);
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
                <Button variant="contained" color="primary" onClick={() => navigate("/internamento")}>Adicionar</Button>
            </Grid>
            <div className="ag-theme-alpine" style={{ height: '400px'}}>
                <AgGridReact 
                    rowData={historicos}
                    columnDefs={columnDefs} 
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    localeText={AG_GRID_LOCALE_BR}
                    gridOptions={{paginationAutoPageSize: true,pagination: true}}
                />
            </div>
        </div>
    )
}

export default GridHistorico;