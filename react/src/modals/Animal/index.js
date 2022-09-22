import React from 'react';
import Popup from 'reactjs-popup-large';

import GridAnimal from './GridAnimal';
import './index.css';

const Animal = () => {
    return (
        <Popup 
            trigger={<button className="button"><p>Animais</p></button>}
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

export default Animal;