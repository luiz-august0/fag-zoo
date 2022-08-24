import React from 'react';
import Popup from 'reactjs-popup';

import GridAnimal from './GridAnimal';
import './index.css';



const Usuario = () => {
    
    return (
        <Popup
            trigger={<button className="button">Animais</button>}
            modal
            nested
            >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header">Animais</div>
                    <div className="content">
                        <GridAnimal/>
                    </div>
                    <div className="actions">
                    </div>
                </div>
            )}
        </Popup>
    );
} 

export default Usuario;