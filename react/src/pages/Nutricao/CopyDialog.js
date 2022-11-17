import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import 
{ 
    DialogActions, 
    DialogContent,
    Alert, 
    AlertTitle, 
    Snackbar,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { copyNutricao } from '../../services/api';

const CopyDialog = ({ open, handleClose, dataAnimais }) => {
    const [ animalOrigem, setAnimalOrigem ] = React.useState();
    const [ animalDestino, setAnimalDestino ] = React.useState();
    const [ openAlert, setOpenAlert ] = React.useState(false);
    const [ msgAlert, setMsgAlert ] = React.useState('');

    const MySwal = withReactContent(Swal);

    const alert = (open,msg) => {
        setMsgAlert(msg);
        setOpenAlert(open);
    }

    const copiaNutricao = async() => {
        try {           
            await copyNutricao(animalOrigem, animalDestino);
            handleClose({id: animalDestino});
            MySwal.fire({
                html: <i>Copiada ficha nutricional com sucesso!</i>,
                icon: 'success'
            })
        } catch (error) {
            handleClose();
            MySwal.fire({
                html: <i>{JSON.stringify(error.response.data).slice(0, -1).slice(1 | 1)}</i>,
                icon: 'error'
            })
        }
    }

    const onConfirm = () => {
        if (animalOrigem === undefined) {
            alert(true, 'Animal de origem é obrigatório');
            return;
        }

        if (animalDestino === undefined) {
            alert(true, 'Animal de destino é obrigatório');
            return;
        }

        copiaNutricao();
        setAnimalOrigem();
        setAnimalDestino();
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        alert(false);
    };  

    const handleChangeOrigem = (event) => {
        setAnimalOrigem(event.target.value);
    }

    const handleChangeDestino = (event) => {
        setAnimalDestino(event.target.value);
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Snackbar 
                open={openAlert} 
                autoHideDuration={5000} 
                onClose={handleCloseAlert}
                anchorOrigin={{vertical: "top", horizontal: "center"}}>
                    <Alert severity="warning" onClose={handleCloseAlert}>
                        <AlertTitle>Alerta</AlertTitle>
                        {msgAlert} <strong>Verifique!</strong>
                    </Alert>
                </Snackbar>

                <DialogTitle id="alert-dialog-title">{"Copia ficha nutricional"}</DialogTitle>
                <DialogContent>
                    <form>
                        <InputLabel required id="demo-simple-select-label">Animal Origem</InputLabel>
                        <Select
                        id="animal_origem" 
                        value={animalOrigem}
                        label="Animal Origem"
                        onChange={handleChangeOrigem}
                        style={{width: '250px'}}
                        >
                            {dataAnimais.map((element) => {
                                return (
                                    <MenuItem value={element.Ani_Codigo}>{element.Ani_Nome} - {element.Ani_Identificacao}</MenuItem> 
                                )
                            })}
                        </Select>
                        <InputLabel required id="demo-simple-select-label">Animal Destino</InputLabel>
                        <Select
                        id="animal_destino" 
                        value={animalDestino}
                        label="Animal Destino"
                        onChange={handleChangeDestino}
                        style={{width: '250px'}}
                        >
                            {dataAnimais.map((element) => {
                                return (
                                    <MenuItem value={element.Ani_Codigo}>{element.Ani_Nome} - {element.Ani_Identificacao}</MenuItem> 
                                )
                            })}
                        </Select>
                        
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="outlined">
                        Cancelar
                    </Button>
                    <Button color="primary" onClick={() => onConfirm()} variant="contained">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CopyDialog;