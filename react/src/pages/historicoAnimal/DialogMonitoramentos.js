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
import { getMonitoracoesCod } from '../../services/api';

const FormDialog = ({ open, handleClose, data, onChange, handleFormSubmit }) => {
    const { id, tipo, hora, resultado } = data;
    const [ monitoracoesCod, setMonitoracoesCod ] = React.useState([]);
    const [ tipoSelected, setTipoSelected] = React.useState();
    const [ openAlert, setOpenAlert ] = React.useState(false);
    const [ msgAlert, setMsgAlert ] = React.useState('');

    const getDataMonitoracoesCod = async () => {
        const response = await getMonitoracoesCod();
        setMonitoracoesCod(response.data);
    }

    React.useEffect(() => {
        getDataMonitoracoesCod();
    }, []);

    const alert = (open,msg) => {
        setMsgAlert(msg);
        setOpenAlert(open);
    }

    const onConfirm = () => {
        if (tipo === '') {
            alert(true, 'Monitoração é obrigatória');
            return;
        }

        if (hora === '') {
            alert(true, 'Horário é obrigatório');
            return;
        }

        if (resultado === '') {
            alert(true, 'Resultado é obrigatório');
            return;
        }

        handleFormSubmit();
        setTipoSelected();
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        alert(false);
    };  

    const handleChange = (event) => {
        data.tipo = event.target.value;
        setTipoSelected(data.tipo);
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

                <DialogTitle id="alert-dialog-title">{id?"Editar Monitoramento":"Cadastrar Monitoramento"}</DialogTitle>
                <DialogContent>
                    <form>
                        <InputLabel required id="demo-simple-select-label">Monitoração</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="tipo"
                        defaultValue={data.tipo !== ''?data.tipo:null}
                        value={data.tipo}
                        label="Monitoração"
                        onChange={handleChange}
                        >
                            {monitoracoesCod.map((element) => {
                                return (
                                    <MenuItem key={element.Codigo} value={element.Codigo}>{element.Codigo} - {element.Descricao}</MenuItem> 
                                )
                            })}
                        </Select>
                        <InputLabel required id="demo-simple-select-label">Horário</InputLabel>
                        <TextField id="hora" required value={hora} onChange={e => onChange(e)} placeholder="Horário" variant="outlined" margin="dense" fullWidth type={'time'}/>
                        <TextField id="resultado" required value={resultado} onChange={e => onChange(e)} placeholder="Resultado" variant="outlined" margin="dense" label="Resultado" fullWidth type={'number'}/>
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