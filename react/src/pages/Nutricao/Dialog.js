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
    const { id, ntr_dia, ntr_hora, ntr_alimento, ntr_unmed, ntr_qtd, ntr_obs} = data;
    const [ openAlert, setOpenAlert ] = React.useState(false);
    const [ msgAlert, setMsgAlert ] = React.useState('');
    const [ diaSelected, setDiaSelected] = React.useState();
    const [ unmedSelected, setUnmedSelected] = React.useState();

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

        if (ntr_unmed === '') {
            alert(true, 'Unidade de medida do alimento é obrigatória');
            return;
        }

        if (ntr_qtd === '') {
            alert(true, 'Quantidade do alimento é obrigatório');
            return;
        }

        handleFormSubmit();
        setDiaSelected();
        setUnmedSelected();
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        alert(false);
    };  

    const handleChangeDia = (event) => {
        data.ntr_dia = event.target.value;
        setDiaSelected(data.ntr_dia);
    } 

    const handleChangeUnmed = (event) => {
        data.ntr_unmed = event.target.value;
        setUnmedSelected(data.ntr_unmed);
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

                <DialogTitle id="alert-dialog-title">{id?"Editar Refeição":"Cadastrar Refeição"}</DialogTitle>
                <DialogContent>
                    <form>
                        <InputLabel required id="demo-simple-select-label">Dia</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="ntr_dia"
                        defaultValue={data.ntr_dia !== ''?data.ntr_dia:null}
                        value={data.ntr_dia}
                        label="Dia"
                        onChange={handleChangeDia}
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
                        <InputLabel required id="demo-simple-select-label">Unidade de Medida</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="ntr_unmed"
                        defaultValue={data.ntr_unmed !== ''?data.ntr_unmed:null}
                        value={data.ntr_unmed}
                        label="Unidade de Medida"
                        onChange={handleChangeUnmed}
                        >
                            <MenuItem value={'KG'}>Kilograma</MenuItem> 
                            <MenuItem value={'UN'}>Unidade</MenuItem> 
                        </Select>
                        <TextField id="ntr_qtd" required value={ntr_qtd} onChange={e => onChange(e)} placeholder="Quantidade" variant="outlined" label="Quantidade" margin="dense" fullWidth type={'number'}/>
                        <TextField id="ntr_obs" value={ntr_obs} onChange={e => onChange(e)} placeholder="Observação" variant="outlined" margin="dense" label="Observação" fullWidth type={'text'}/>
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