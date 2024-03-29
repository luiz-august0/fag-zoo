import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
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

import { getSetores } from '../../services/api';

const FormDialog = ({ open, handleClose, data, onChange, handleFormSubmit }) => {
    const { id, usuario, senha, setor } = data;
    const [ setores, setSetores ] = React.useState([]);
    const [ openAlert, setOpenAlert ] = React.useState(false);
    const [ setorSelected, setSetorSelected] = React.useState();
    
    const getDataSetores = async () => {
        const response = await getSetores();
        setSetores(response.data);
    }

    React.useEffect(() => {
        getDataSetores();
    }, []);

    const onConfirm = () => {
        if (usuario === '' || senha === '' || setor === '') {
            setOpenAlert(true);
            return;
        }

        handleFormSubmit();
        setOpenAlert(false);
        setSetorSelected();
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenAlert(false);
    };  

    const handleChange = (event) => {
        data.setor = event.target.value;
        setSetorSelected(data.setor);
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
                        Existem campos que não foram preenchidos <strong>Verificar!</strong>
                    </Alert>
                </Snackbar>

                <DialogTitle id="alert-dialog-title">{id?"Editar Usuário":"Criar novo Usuário"}</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField required id="usuario" value={usuario} onChange={e => onChange(e)} placeholder="Usuário" variant="outlined" margin="dense" label="Usuário" fullWidth />
                        <TextField required id="senha" value={senha} onChange={e => onChange(e)} placeholder="Senha" variant="outlined" label="Senha" margin="dense" fullWidth />
                        <InputLabel required id="demo-simple-select-label">Setor</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="setor" 
                        defaultValue={data.setor !== ''?data.setor:null}
                        value={data.setor}
                        label="Setor"
                        onChange={handleChange}
                        >
                            {setores.map((element) => {
                                return (
                                    <MenuItem value={element.Str_Codigo}>{element.Str_Descricao}</MenuItem> 
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

export default FormDialog;