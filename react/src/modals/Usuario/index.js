import React from 'react';
import { Popup as PopupDesktop } from 'reactjs-popup-normal';
import { Popup as PopupMobile } from 'reactjs-popup-large';
import { mobileDetect } from '../../globalFunctions';

import GridUsuario from './GridUsuario';
import './index.css';

const Usuario = () => {

    if (mobileDetect() === true) {
        return (
            <PopupMobile
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
                    </div>
                )}
            </PopupMobile>
        );
    } else {
        return (
            <PopupDesktop
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
                    </div>
                )}
            </PopupDesktop>
        );
    }
} 

export default Usuario;