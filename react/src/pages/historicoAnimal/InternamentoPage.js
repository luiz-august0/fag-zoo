import React, { useState } from 'react';
import './styles.css';
import Image from '../../img/back-arrow.png';
import { Button} from '@mui/material';
import { useNavigate } from "react-router-dom";
import CadInternamento from './CadInternamento';

const Internamento = () => {
	const navigate = useNavigate();
	const [ selectedComponent, setSelectedComponent ] = useState(<CadInternamento/>);
    
    const flexOn = () => {
        if (selectedComponent.type.name.toString() === 'CadInternamento') {
            return 'flex';
        } else {
            return '1'
        }
    }

    const handleClickVoltar = () => {
        localStorage.removeItem('animalIDHistorico');
        localStorage.removeItem('historicoAnimalID');
        navigate("/historico_internamento")
    }

    return (
        <div>
            <div className="headerHistInternamento">
                <h2>Internamento</h2>
                <button className='ToHome' onClick={() => handleClickVoltar()}><img src={Image}  className="Home-button" alt="" width={40} height={40}/></button>
            </div>
            <div className="main-container">
                <div className="main-screen">
                    <Button variant="contained" color="primary" onClick={() => setSelectedComponent(<CadInternamento/>)}>Internamento</Button>
                    <Button style={{left: '5%'}} variant="contained" color="primary">Monitorações</Button>
					<Button style={{left: '10%'}} variant="contained" color="primary">Medicamentos</Button>
					<Button style={{left: '15%'}} variant="contained" color="primary">Exames</Button>
                </div>
                <div style={{display: flexOn(), justifyContent: 'center', marginTop: '2%'}}>
					{selectedComponent}
                </div>
            </div>
        </div>
    );
};

export default Internamento;