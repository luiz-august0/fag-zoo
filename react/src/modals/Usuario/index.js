import React from 'react';
import Popup from 'reactjs-popup-normal';

import GridUsuario from './GridUsuario';
import './index.css';

const Usuario = () => {
    
    return (
        <Popup
            trigger={<button className="button">Usuários</button>}
            modal
            nested
            >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header">Usuários</div>
                    <div className="content">
                        <GridUsuario/>
                    </div>
                    <div className="actions">
                    </div>
                </div>
            )}
        </Popup>
    );
} 

export default Usuario;