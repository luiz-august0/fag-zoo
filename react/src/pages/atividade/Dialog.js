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
    const { id, descricao, dataAtt, hora, resp, interacao} = data;
    const [ openAlert, setOpenAlert ] = React.useState(false);
    const [ msgAlert, setMsgAlert ] = React.useState('');
    const [ interacaoSelected, setInteracaoSelected] = React.useState();

    const alert = (open,msg) => {
        setMsgAlert(msg);
        setOpenAlert(open);
    }

    const onConfirm = () => {
        if (descricao === '') {
            alert(true, 'Descrição é obrigatória');
            return;
        }

        if (dataAtt === '') {
            alert(true, 'Data é obrigatória');
            return;
        } else {
            let dateSplitted = dataAtt.split('-');
            let dateCompleted = dateSplitted[0] + dateSplitted[1] + dateSplitted[2];
            if (dateCompleted.length !== 8) {
                alert(true, 'Data inválida');
                return;
            }
        }

        if (hora === '') {
            alert(true, 'Hora é obrigatória');
            return;
        }

        if (resp === '') {
            alert(true, 'Responsável é obrigatório');
            return;
        }

        if (interacao === '') {
            alert(true, 'Interação é obrigatória');
            return;
        }

        handleFormSubmit();
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        alert(false);
    };  

    const handleChange = (event) => {
        data.interacao = event.target.value;
        setInteracaoSelected(data.interacao);
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

                <DialogTitle id="alert-dialog-title">{id?"Editar Atividade":"Cadastrar Atividade"}</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField required id="descricao" value={descricao} onChange={e => onChange(e)} placeholder="Descrição" variant="outlined" margin="dense" label="Descrição" fullWidth type={'text'}/>
                        <InputLabel required id="demo-simple-select-label">Data</InputLabel>
                        <TextField id="dataAtt" required value={dataAtt} onChange={e => onChange(e)} placeholder="Data" variant="outlined" margin="dense" fullWidth type={'date'}/>
                        <InputLabel required id="demo-simple-select-label">Hora</InputLabel>
                        <TextField id="hora" required value={hora} onChange={e => onChange(e)} placeholder="Hora" variant="outlined" margin="dense" fullWidth type={'time'}/>
                        <TextField id="resp" required value={resp} onChange={e => onChange(e)} placeholder="Responsável" variant="outlined" margin="dense" label="Responsável" fullWidth type={'text'}/>
                        <InputLabel required id="demo-simple-select-label">Interação</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="interacao"
                        defaultValue={data.interacao !== ''?data.interacao:null}
                        value={data.interacao}
                        label="Interação"
                        onChange={handleChange}
                        >
                            <MenuItem value={'B'}>BOA</MenuItem> 
                            <MenuItem value={'M'}>MÉDIA</MenuItem> 
                            <MenuItem value={'R'}>RUIM</MenuItem>  
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