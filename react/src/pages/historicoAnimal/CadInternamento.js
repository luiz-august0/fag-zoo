import * as React from 'react';
import Button from '@mui/material/Button';
import 
{ 
    TextField, 
    Alert, 
    AlertTitle, 
    Snackbar,
    InputLabel
} from '@mui/material';

const CadInternamento = () => {
    const [ openAlert, setOpenAlert ] = React.useState(false);
    const [ msgAlert, setMsgAlert ] = React.useState('');

    const alert = (open,msg) => {
        setMsgAlert(msg);
        setOpenAlert(open);
    }

    const onConfirm = () => {
        handleFormSubmit()
    }

	const handleFormSubmit = () => {
		alert('clicou');
	}

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        alert(false);
    };  

    return (
        <div>
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
			<form>
				<InputLabel required id="demo-simple-select-label">Data</InputLabel>
                <TextField id="dataHist" required value={'dataHist'} placeholder="Data" variant="outlined" margin="dense" fullWidth type={'date'}/>
				<InputLabel required id="demo-simple-select-label">Hora</InputLabel>
				<TextField id="ntr_hora" required value={'ntr_hora'} placeholder="Hora" variant="outlined" margin="dense" fullWidth type={'time'}/>
				<TextField id="ntr_alimento" required value={'ntr_alimento'} placeholder="Alimento" variant="outlined" margin="dense" label="Alimento" fullWidth type={'text'}/>
				<TextField id="ntr_alimento" required value={'ntr_alimento'} placeholder="Alimento" variant="outlined" margin="dense" label="Alimento" fullWidth type={'text'}/>
				<TextField id="ntr_alimento" required value={'ntr_alimento'} placeholder="Alimento" variant="outlined" margin="dense" label="Alimento" fullWidth type={'text'}/>
				<TextField id="ntr_alimento" required value={'ntr_alimento'} placeholder="Alimento" variant="outlined" margin="dense" label="Alimento" fullWidth type={'number'}/>
				<TextField id="ntr_alimento" required value={'ntr_alimento'} placeholder="Alimento" variant="outlined" margin="dense" label="Alimento" fullWidth type={'submit'}/>
				<TextField id="ntr_alimento" required value={'ntr_alimento'} placeholder="Alimento" variant="outlined" margin="dense" label="Alimento" fullWidth type={'text'}/>
				<TextField id="ntr_alimento" required value={'ntr_alimento'} placeholder="Alimento" variant="outlined" margin="dense" label="Alimento" fullWidth type={'text'}/>
			</form>
			<Button color="secondary" variant="outlined">
				Cancelar
			</Button>
			<Button color="primary" onClick={() => onConfirm()} variant="contained">
				Confirmar
			</Button>
        </div>
    );
}

export default CadInternamento;