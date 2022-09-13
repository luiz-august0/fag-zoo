import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './styles.css';
import Image from '../../img/logout.png';
import 
{ 
    Select,
    Button,
    MenuItem,
} from '@mui/material';

import GridNutricao from './GridNutricao';
import { showAnimal, getAnimais } from '../../services/api';

const Nutricao = () => {
    const navigate = useNavigate(); 
    const [animalSelected, setAnimalSelected] = useState();
    const [animais, setAnimais] = useState([]);
    const [animalData, setAnimalData] = useState([]);

    React.useEffect(() => {
        getDataAnimais();
    }, []);

    const getDataAnimais = async () => {
        const response = await getAnimais();
        setAnimais(response.data);
    }

    const getDataAnimal = async (id) => {
        const response = await showAnimal(id);
        setAnimalData(response.data);
    }

    const onConfirm = () => {
        if (animalSelected !== undefined) {
            getDataAnimal(animalSelected);
        }
    }

    const handleChange = (event) => {
        setAnimalSelected(event.target.value);
    }

    return (
        <div>
            <div className="cont-second">
                <h2>Nutrição</h2>
                <button className='ToHome' onClick={  () => navigate("/")}><img src={Image}  className="Home-button" alt="" width={40} height={40}/></button>
            </div>
            <div className="main-container">
                <div className="main-screen">
                    <Select
                    id="animal" 
                    value={animalSelected}
                    label="Nutrição"
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
                </div>
                <div className="animal-content">
                    {animalData.map((element) => {
                        return (
                            <div>
                                <h2>Código: {element.Ani_Codigo}</h2>
                                <h2>Nome: {element.Ani_Nome}</h2>
                                <h2>Identificação: {element.Ani_Identificacao}</h2>
                                <GridNutricao animalID={element.Ani_Codigo}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Nutricao;