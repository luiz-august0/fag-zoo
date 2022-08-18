import React, { useState, useEffect } from "react";
import 
{ 
GridComponent,
ColumnDirective, 
ColumnsDirective, 
Page, 
Edit, 
Inject, 
EditSettingsModel,
Toolbar,
ToolbarItems
} from "@syncfusion/ej2-react-grids";
import { getUsuarios } from "../../services/api";
import "./GridUsuario.css";

const GridUsuario = () => {
    
    const [data, setData] = useState();
    
    function refreshGrid() {
        getUsuarios()
          .then(
            data => {
                console.log(data);
            }
          );
      }

    useEffect(() => {
        refreshGrid();
    }, []);

    const editOptions: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    const toolbarOptions: ToolbarItems[] = ['Add', 'Edit', 'Delete'];


    function dataSourceChanged(state: any) {
        debugger;
        console.log(state); //should log to the console
        /*if (state.action === "add") {
            addOrder(state.data).then((res) => refreshGrid());
        } else if (state.action === "edit") {
            updateOrder(state.data).then((res) => refreshGrid());
        } else if (state.requestType === "delete") {
            deleteOrder(state.data[0].OrderID).then((res) => refreshGrid());
        }*/
    }


    return (
        <div>
            <GridComponent
                dataSource={data}
                allowPaging={true}
                pageSettings={{ pageSize: 10 }}
                editSettings={editOptions}
                toolbar={toolbarOptions}
                dataSourceChanged={dataSourceChanged}
            >
                <ColumnsDirective>
                    <ColumnDirective field='Usr_Login' headerText='Usuário' width='50' editType="textedit"/>
                    <ColumnDirective field='Usr_Senha' headerText='Senha' width='50' editType="textedit"/>
                    <ColumnDirective field='Str_Descricao' headerText='Setor' width='50' editType="dropdownedit"/>
                </ColumnsDirective>
                <Inject services={[Page,  Edit, Toolbar]}/>
            </GridComponent>
        </div>
    )
}

export default GridUsuario;