import React from 'react';
import { useNavigate } from "react-router-dom";
import './styles.css';
import Image from '../../img/logout.png';
import 
{ 
    DialogActions, 
    DialogContent,
    TextField, 
    Alert, 
    AlertTitle, 
    Snackbar,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';

const Nutricao = () => {
   
    const navigate = useNavigate(); 

    return (
        <div className="main-container">
            <div className="cont-second">
                <h2>Nutrição</h2>
                <button className='ToHome' onClick={  () => navigate("/")}><img src={Image}  className="Home-button" alt="" width={40} height={40}/></button>
            </div>
            <div class="on-screen">
                //<TextField  style={width: 50%'} id="search" placeholder="Animal" variant="outlined" margin="dense" label="Animal" fullWidth />
            </div>
        </div>
    );
};

export default Nutricao;