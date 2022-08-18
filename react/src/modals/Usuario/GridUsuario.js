import React, { useState, useEffect } from "react";
import { GridComponent, ColumnDirective, ColumnsDirective, Page, Inject, EditSettingsModel } from "@syncfusion/ej2-react-grids";
import { getUsuarios } from "../../services/api";

import "./GridUsuario.css";

const GridUsuario = () => {

    const [usuarios, setUsuarios] = useState([]);

    const loadData = async (query = '') => {
        const response = await getUsuarios(query);
        setUsuarios(response.data);
    }

    useEffect(() => {
        (async () => await loadData())();  
    }, []);

    const columns = [
        { field: 'Usr_Login', headerText: 'Usuário', width: '50' },
        { field: 'Str_Descricao', headerText: 'Setor', width: '50' }
    ];

    //const editOptions: EditSettingsModel = { allowEditing: true };

    return (
        <div>
            <GridComponent
                dataSource={usuarios}
                columns={columns}
                loading={!usuarios.length}
                allowPaging={true}
                pageSettings={{ pageSize: 12 }}
            >
                <Inject services={[Page, Edit]}/>
            </GridComponent>
        </div>
    )
}

export default GridUsuario;