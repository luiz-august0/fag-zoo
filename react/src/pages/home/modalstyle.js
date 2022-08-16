import React from 'react';
import Popup from 'reactjs-popup';
import './modal.css';


const Modal = () => (
  <Popup
    trigger={<button className="button"> Cadastro de animais </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Cadastro de Animais</div>
        <div className="content">
          {' '}
          teste1
          <br />
          teste2
        </div>
        <div className="actions">
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            Gravar
          </button>
        </div>
      </div>
    )}
  </Popup>
);

export default Modal;