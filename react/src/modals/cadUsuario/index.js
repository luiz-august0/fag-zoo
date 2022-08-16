import React, { useState , useEffect} from 'react';
import Popup from 'reactjs-popup';
import { Link } from "react-router-dom";

import Search from './Search';
import Usuario from './Usuarios';
import './index.css';

import { getUsuarios } from '../../services/api';


const CadastroUsuario = () => {

    const [usuarios, setUsuarios] = useState([]);

    const loadData = async (query = '') => {
        const response = await getUsuarios(query);
        setUsuarios(response.data);
    }

    useEffect(() => {
        (async () => await loadData())();  
    }, []);

    const handleSearch = () => {

    }

    const handleDeleteUsuario = (usuario) => {

    }
    
    return (
        <Popup
            trigger={<button className="button">Cadastro de Usuário</button>}
            modal
            nested
            >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header">Cadastro de Usuário</div>
                    <div className="content">
                        <Search onSearch={handleSearch}/>
                        <Usuario 
                        usuarios={usuarios} 
                        onDeleteUsuario={handleDeleteUsuario}/>
                    </div>
                    <div className="actions">
                    <button className="button"onClick={() => {}}>
                        Novo
                    </button>
                    </div>
                </div>
            )}
        </Popup>
    );
} 

export default CadastroUsuario;