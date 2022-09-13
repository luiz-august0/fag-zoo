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
    const { id, ntr_dia, ntr_hora, ntr_alimento, ntr_qtd} = data;
    const [ openAlert, setOpenAlert ] = React.useState(false);
    const [ msgAlert, setMsgAlert ] = React.useState('');
    const [ diaSelected, setDiaSelected] = React.useState();

    const alert = (open,msg) => {
        setMsgAlert(msg);
        setOpenAlert(open);
    }

    const onConfirm = () => {
        if (ntr_dia === '') {
            alert(true, 'Dia é obrigatório');
            return;
        }

        if (ntr_hora === '') {
            alert(true, 'Hora é obrigatório');
            return;
        }

        if (ntr_alimento === '') {
            alert(true, 'Alimento é obrigatório');
            return;
        }

        if (ntr_qtd === '') {
            alert(true, 'Quantidade do alimento é obrigatório');
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
        data.ntr_dia = event.target.value;
        setDiaSelected(data.ntr_dia);
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

                <DialogTitle id="alert-dialog-title">{id?"Editar Nutrição":"Cadastrar Nutrição"}</DialogTitle>
                <DialogContent>
                    <form>
                        <InputLabel required id="demo-simple-select-label">Dia</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="ntr_dia"
                        defaultValue={data.ntr_dia !== ''?data.ntr_dia:null}
                        value={data.ntr_dia}
                        label="Dia"
                        onChange={handleChange}
                        >
                            <MenuItem value={'SEG'}>Segunda-Feira</MenuItem> 
                            <MenuItem value={'TER'}>Terça-Feira</MenuItem> 
                            <MenuItem value={'QUA'}>Quarta-Feira</MenuItem> 
                            <MenuItem value={'QUI'}>Quinta-Feira</MenuItem> 
                            <MenuItem value={'SEX'}>Sexta-Feira</MenuItem> 
                            <MenuItem value={'SAB'}>Sábado</MenuItem> 
                            <MenuItem value={'DOM'}>Domingo</MenuItem> 
                        </Select>
                        <InputLabel required id="demo-simple-select-label">Hora</InputLabel>
                        <TextField id="ntr_hora" required value={ntr_hora} onChange={e => onChange(e)} placeholder="Hora" variant="outlined" margin="dense" fullWidth type={'time'}/>
                        <TextField id="ntr_alimento" required value={ntr_alimento} onChange={e => onChange(e)} placeholder="Alimento" variant="outlined" margin="dense" label="Alimento" fullWidth type={'text'}/>
                        <TextField id="ntr_qtd" required value={ntr_qtd} onChange={e => onChange(e)} placeholder="Quantidade" variant="outlined" label="Quantidade" margin="dense" fullWidth type={'number'}/>
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