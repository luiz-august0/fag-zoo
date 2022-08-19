import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, TextField } from '@mui/material';

const FormDialog = ({ open, handleClose, data, onChange, handleFormSubmit }) => {
    const { usuario, senha, setor } = data;

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Criar novo Usuário</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField id="usuario" value={usuario} onChange={e => onChange(e)} placeholder="Usuário" variant="outlined" margin="dense" label="Usuário" fullWidth />
                        <TextField id="senha" value={senha} onChange={e => onChange(e)} placeholder="Senha" variant="outlined" label="Senha" margin="dense" fullWidth />
                        <TextField id="setor" value={setor} onChange={e => onChange(e)} placeholder="Código Setor" variant="outlined" label="Código Setor" margin="dense" type={"number"} fullWidth />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="outlined">
                        Cancelar
                    </Button>
                    <Button color="primary" onClick={() => handleFormSubmit()} variant="contained">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormDialog;