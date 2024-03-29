import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './styles.css';
import Image from '../../img/back-arrow.png';
import 
{ 
    Select,
    Button,
    MenuItem,
    InputLabel
} from '@mui/material';

import CopyDialog from './CopyDialog';
import GridNutricao from './GridNutricao';
import { showAnimal, getAnimais } from '../../services/api';

const Nutricao = () => {
    const navigate = useNavigate(); 
    const [animalSelected, setAnimalSelected] = useState();
    const [animais, setAnimais] = useState([]);
    const [animalData, setAnimalData] = useState([]);
    const [open, setOpen] = useState(false);

    React.useEffect(() => {
        getDataAnimais();
    }, []);

    const getDataAnimais = async () => {
        const response = await getAnimais();
        setAnimais(response.data);
    }

    const getDataAnimal = async (id) => {
        setAnimalData([]);
        if (id !== undefined) {
            const response = await showAnimal(id);
            setAnimalData(response.data);
        } else {
            const response = await getAnimais();
            setAnimalData(response.data);
        }
    }

    const onConfirm = () => {
        if (animalSelected !== undefined) {
            getDataAnimal(animalSelected);
        }
    }

    const handleChange = (event) => {
        setAnimalSelected(event.target.value);
    }

    const handleClose = ({id}) => {
        setOpen(false);
        if (id !== undefined) {
            getDataAnimal(id);
        } else {
            if (animalSelected !== undefined) {
                getDataAnimal(animalSelected);
            } else {
                getDataAnimal();
            }
        }
    }

    return (
        <div>
            <div className="headerNutri">
                <h2>Nutrição</h2>
                <button className='ToHome' onClick={  () => navigate("/")}><img src={Image}  className="Home-button" alt="" width={40} height={40}/></button>
            </div>
            <div className="main-container">
                <div className="main-screen">
                    <InputLabel id="demo-simple-select-label">Buscar Animal</InputLabel>
                    <Select
                    id="animal" 
                    value={animalSelected}
                    label="Animal"
                    onChange={handleChange}
                    style={{width: '250px'}}
                    >
                        {animais.map((element) => {
                            return (
                                <MenuItem value={element.Ani_Codigo}>{element.Ani_Nome} - {element.Ani_Identificacao}</MenuItem> 
                            )
                        })}
                    </Select>
                    <Button style={{left: '5%'}} variant="contained" color="primary" onClick={() => onConfirm()}>Confirmar</Button>
                    <Button style={{left: '10%'}} variant="contained" color="warning" onClick={() => getDataAnimal()}>Carregar todos</Button>
                    <Button style={{left: '15%'}} variant="contained" color="warning" onClick={() => setOpen(true)} >Copiar Nutrição</Button>
                </div>
                <div className="animal-content">
                    {animalData.map((element) => {
                        return (
                            <div>
                                <div className="animalNutricao-information">
                                    <h3>Código: {element.Ani_Codigo}</h3>
                                    <h3>Nome: {element.Ani_Nome}</h3>
                                    <h3>Identificação: {element.Ani_Identificacao !== null?element.Ani_Identificacao:"Não contém"}</h3>
                                </div>
                                <h2>Tabela de nutrição do Animal</h2>
                                <GridNutricao animalID={element.Ani_Codigo}/>
                                <br/>
                                <br/>
                            </div>
                        )
                    })}
                </div>
                <CopyDialog
                open={open} 
                handleClose={handleClose} 
                dataAnimais={animais} 
                />
            </div>
        </div>
    );
};

export default Nutricao;