import React from 'react';
import Popup from 'reactjs-popup';

import GridUsuario from './GridUsuario';
import './index.css';



const Usuario = () => {
    
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
                        <GridUsuario/>
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

export default Usuario;