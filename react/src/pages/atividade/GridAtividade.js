import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { showAtividade, createAtividade, updateAtividade, deleteAtividade } from "../../services/api";
import moment from 'moment';

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import FormDialog from "./Dialog";
import PopupImagens from "./PopupImagens";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AG_GRID_LOCALE_BR, flexOnOrNot } from "../../globalFunctions";

const GridAtividade = (animalID) => {
    const initialValue = {codigoAni : animalID.animalID, descricao: "", dataAtt: "", hora: "", resp: "", interacao: ""};
    const MySwal = withReactContent(Swal);
    const [gridApi, setGridApi] = useState(null);
    const [atividades, setAtividades] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState(initialValue);

    const columnDefs = [
        { field: "Ativ_Codigo", headerName: "Código", hide: true},
        { field: "Ani_Codigo", headerName: "Código do Animal", hide: true},
        { field: "Ativ_Desc", headerName: "Descrição"},
        { field: "Ativ_Data", headerName: "Data", filter: 'agDateColumnFilter',
         valueFormatter: function (params) { return moment(params.data.Ativ_Data).format('DD/MM/YYYY')},
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
        { field: "Ativ_Hora", headerName: "Hora" },
        { field: "Ativ_Resp", headerName: "Responsável" },
        { field: "Ativ_Interacao", headerName: "Interação", cellRendererFramework:(params) => {
            let interacao = "";
            switch (params.data.Ativ_Interacao) {
                case "B":
                    interacao = "BOA";
                    break;
                case "M": 
                    interacao = "MÉDIA";
                    break;
                case "R":
                    interacao = "RUIM";
                    break;
                default:
                    break;
            }

            return (
                <div>
                    {interacao}
                </div>
            )
        }},
        {cellRendererFramework:(params) => {
            const atividadeID = params.data.Ativ_Codigo;
            return (
            <div>
                <PopupImagens/>
            </div>
            )
        }},
        { field: "Ativ_Codigo", headerName:"Ações", cellRendererFramework:(params) => 
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
        const response = await showAtividade(animalID.animalID);
        setAtividades(response.data);
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
        const descricao = formData.descricao;
        const dataAtt = formData.dataAtt;
        const hora = formData.hora;
        const resp = formData.resp;
        const interacao = formData.interacao;

        if(formData.id) {
            try {            
                await updateAtividade(formData.id, descricao, dataAtt, hora, resp, interacao);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Atividade alterada com sucesso!</i>,
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
                await createAtividade(codigoAni, descricao, dataAtt, hora, resp, interacao);
                refreshGrid();
                handleClose();
                MySwal.fire({
                    html: <i>Atividade cadastrada com sucesso!</i>,
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
            descricao: oldData.Ativ_Desc, 
            dataAtt: moment(oldData.Ativ_Data).format('YYYY-MM-DD'), 
            hora: oldData.Ativ_Hora, 
            resp: oldData.Ativ_Resp,
            interacao: oldData.Ativ_Interacao,
            id: oldData.Ativ_Codigo});
        handleClickOpen();
    }

    //Deleta registro
    const handleDelete = (id) => {
       const deleteRegister = async () => {
            try {
                await deleteAtividade(id);
                MySwal.fire({
                    html: <i>Atividade excluida com sucesso!</i>,
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
            title: 'Confirma a exclusão da atividade?',
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
                    rowData={atividades}
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

export default GridAtividade;