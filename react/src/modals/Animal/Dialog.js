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

const FormDialog = ({ open, handleClose, data, onChange, handleFormSubmit }) => {
    const { id, ani_nome, ani_nomecient, ani_apelido, ani_identificacao, ani_sexo, ani_origem } = data;
    const [ openAlert, setOpenAlert ] = React.useState(false);
    const [ msgAlert, setMsgAlert ] = React.useState('');
    const [ sexoSelected, setSexoSelected] = React.useState();

    data.ani_sexo = sexoSelected;

    const alert = (open,msg) => {
        setMsgAlert(msg);
        setOpenAlert(open);
    }

    const onConfirm = () => {
        if (ani_nome === '') {
            alert(true, 'Nome do animal é obrigatório');
            return;
        }

        if (ani_sexo === undefined) {
            alert(true, 'Sexo é obrigatório');
            return;
        }

        handleFormSubmit()
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        alert(false);
    };  

    const handleChange = (event) => {
        setSexoSelected(event.target.value);
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

                <DialogTitle id="alert-dialog-title">{id?"Editar Animal":"Cadastrar Animal"}</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField id="ani_nome" value={ani_nome} onChange={e => onChange(e)} placeholder="Nome" variant="outlined" margin="dense" label="Nome" fullWidth/>
                        <TextField id="ani_nomecient" value={ani_nomecient} onChange={e => onChange(e)} placeholder="Nome Científico" variant="outlined" label="Nome Científico" margin="dense" fullWidth />
                        <TextField id="ani_apelido" value={ani_apelido} onChange={e => onChange(e)} placeholder="Apelido" variant="outlined" margin="dense" label="Apelido" fullWidth />
                        <TextField id="ani_identificacao" value={ani_identificacao} onChange={e => onChange(e)} placeholder="Identificação" variant="outlined" label="Identificação" margin="dense" fullWidth />
                        <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="ani_sexo"
                        value={sexoSelected}
                        label="Setor"
                        onChange={handleChange}
                        >
                            <MenuItem value={'M'}>Masculino</MenuItem> 
                            <MenuItem value={'F'}>Feminino</MenuItem> 
                            <MenuItem value={'H'}>Hermafrodita</MenuItem> 
                        </Select>
                        <TextField id="ani_origem" value={ani_origem} onChange={e => onChange(e)} placeholder="Origem" variant="outlined" margin="dense" label="Origem" fullWidth />
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