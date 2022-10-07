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
    const { id, comp, outrComp, obs, dataHist, hora, resp} = data;
    const [ openAlert, setOpenAlert ] = React.useState(false);
    const [ msgAlert, setMsgAlert ] = React.useState('');
    const [ compSelected, setCompSelected] = React.useState();

    const alert = (open,msg) => {
        setMsgAlert(msg);
        setOpenAlert(open);
    }

    const onConfirm = () => {
        if (comp === '') {
            alert(true, 'Comportamento é obrigatório');
            return;
        }

        if (dataHist === '') {
            alert(true, 'Data é obrigatória');
            return;
        }

        if (hora === '') {
            alert(true, 'Hora é obrigatório');
            return;
        }

        if (resp === '') {
            alert(true, 'Responsável é obrigatório');
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
        data.comp = event.target.value;
        setCompSelected(data.comp);
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

                <DialogTitle id="alert-dialog-title">{id?"Editar Histórico":"Cadastrar Histórico"}</DialogTitle>
                <DialogContent>
                    <form>
                        <InputLabel required id="demo-simple-select-label">Comportamento</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="comp"
                        defaultValue={data.comp !== ''?data.comp:null}
                        value={data.comp}
                        label="Comportamento"
                        onChange={handleChange}
                        >
                            <MenuItem value={'PA'}>(PA)Parado Ativo</MenuItem> 
                            <MenuItem value={'PI'}>(PI)Parado Inativo</MenuItem> 
                            <MenuItem value={'V1'}>(V1)Vocalização Alta</MenuItem> 
                            <MenuItem value={'V2'}>(V2)Vocalização Baixa</MenuItem> 
                            <MenuItem value={'IS+'}>(IS+)Interação social positiva</MenuItem> 
                            <MenuItem value={'IS-'}>(IS-)Interação social negativa</MenuItem> 
                            <MenuItem value={'M'}>(M)Movimentando-se</MenuItem> 
                            <MenuItem value={'CM'}>(CM)Comportamento de manutenção</MenuItem> 
                            <MenuItem value={'IE'}>(IE)Interação com o enriquecimento</MenuItem> 
                            <MenuItem value={'F'}>(F)Forragem</MenuItem> 
                            <MenuItem value={'A'}>(A)Alimentando-se</MenuItem> 
                            <MenuItem value={'D'}>(D)Defecar</MenuItem> 
                            <MenuItem value={'EX'}>(EX)Exploratório</MenuItem> 
                            <MenuItem value={'ES'}>(ES)Estereotipado</MenuItem> 
                            <MenuItem value={'FU'}>(FU)Fuga</MenuItem> 
                        </Select>
                        <TextField id="outrComp" value={outrComp} onChange={e => onChange(e)} placeholder="Outro Comportamento" variant="outlined" margin="dense" label="Outro Comportamento" fullWidth type={'text'}/>
                        <TextField id="obs" value={obs} onChange={e => onChange(e)} placeholder="Observação" variant="outlined" margin="dense" label="Observação" fullWidth type={'text'}/>
                        <InputLabel required id="demo-simple-select-label">Data</InputLabel>
                        <TextField id="dataHist" required value={dataHist} onChange={e => onChange(e)} placeholder="Data" variant="outlined" margin="dense" fullWidth type={'date'}/>
                        <InputLabel required id="demo-simple-select-label">Hora</InputLabel>
                        <TextField id="hora" required value={hora} onChange={e => onChange(e)} placeholder="Hora" variant="outlined" margin="dense" fullWidth type={'time'}/>
                        <TextField id="resp" required value={resp} onChange={e => onChange(e)} placeholder="Responsável" variant="outlined" margin="dense" label="Responsável" fullWidth type={'text'}/>
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