import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import 
{ 
    TextField, 
    Alert, 
    AlertTitle, 
    Snackbar,
    InputLabel
} from '@mui/material';
import moment from 'moment';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './CadInternamento.css'
import { createInternacao, showInternacao, updateInternacao } from '../../services/api';

const CadInternamento = () => {
	const initialState = {codigoAni: "", dataHist: "", horaHist: "", motivo: "", medico: "", diagnostico: "", peso: "", orientacao: "", evolucao: "", exameComp: ""};

	const MySwal = withReactContent(Swal);
	const [ formData, setFormData ] = useState(initialState);
    const [ openAlert, setOpenAlert ] = useState(false);
    const [ msgAlert, setMsgAlert ] = useState('');
	const [ editMode, setEditMode ] = useState(false);
	const [ newRegister, setNewRegister ] = useState(false);

	const loadData = async() => {
		const response = await showInternacao(localStorage.getItem('historicoAnimalID'));
		const data = response.data[0];
		setFormData({codigoAni: data.Ani_Codigo, dataHist: moment(data.HsAni_Data).format('YYYY-MM-DD'), horaHist: data.HsAni_Hora, motivo: data.HsAni_MtvInt, medico: data.HsAni_Medico,
					diagnostico: data.HsAni_Diag, peso: data.HsAni_Peso, orientacao: data.HsAni_Orient, evolucao: data.HsAni_Evl, exameComp: data.HsAni_ExComp});
	}

	useEffect(() => {
        if (localStorage.getItem('historicoAnimalID') === null) {
			setEditMode(true);
			setNewRegister(true);
		} else {
			loadData();
		}
    }, []);

	const reloadPage = () => {
		setNewRegister(false);
		setEditMode(false);
		setFormData(initialState);
	}

	const handleClickNovo = () => {
		setNewRegister(true);
		setEditMode(true);
		setFormData(initialState);
	}

	const handleClickCancelar = () => {
		reloadPage();
		if (localStorage.getItem('historicoAnimalID') !== null) {
			loadData();
		}
	}

    const alert = (open,msg) => {
        setMsgAlert(msg);
        setOpenAlert(open);
    }

    const onConfirm = () => {
		if (formData.dataHist === '') {
            alert(true, 'Data é obrigatória');
            return;
        } else {
            let dateSplitted = formData.dataHist.split('-');
            let dateCompleted = dateSplitted[0] + dateSplitted[1] + dateSplitted[2];
            if (dateCompleted.length !== 8) {
                alert(true, 'Data inválida');
                return;
            }
        }

		if (formData.horaHist === '') {
            alert(true, 'Hora é obrigatória');
            return;
        } 

		if (formData.peso === '') {
            alert(true, 'Peso do animal é obrigatório');
            return;
        }

        handleFormSubmit();
    }

	const handleFormSubmit = async () => {
		try {    
			if (newRegister) {
				const response = await createInternacao(localStorage.getItem('animalIDHistorico'), formData.dataHist, formData.horaHist, formData.motivo, formData.medico, formData.diagnostico, formData.peso, formData.orientacao,
									formData.evolucao, formData.exameComp);
				MySwal.fire({
					html: <i>Ficha de internamento cadastrada com sucesso!</i>,
					icon: 'success'
				});

				localStorage.setItem('historicoAnimalID', response.data.insertId);
				reloadPage();
				loadData();
				window.location.reload();
			} else {
				await updateInternacao(localStorage.getItem('historicoAnimalID'), formData.dataHist, formData.horaHist, formData.motivo, formData.medico, formData.diagnostico, formData.peso, formData.orientacao,
									formData.evolucao, formData.exameComp);
				MySwal.fire({
					html: <i>Ficha de internamento atualizada com sucesso!</i>,
					icon: 'success'
				});
				reloadPage();
				loadData();
			}
		} catch (error) {
			MySwal.fire({
				html: <i>{JSON.stringify(error.response.data).slice(0, -1).slice(1 | 1)}</i>,
				icon: 'error'
			})
		}
	}

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        alert(false);
    };  

	const onChange = (e) => {
        const {value, id} = e.target;
        setFormData({...formData,[id]:value})
    }

    return (
        <div className="content">
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
			<div>
				{!newRegister && localStorage.getItem('historicoAnimalID') !== null?
				<Button color="warning" variant="outlined" onClick={() => setEditMode(true)}>
					Editar
				</Button>:null}
				<Button color="primary" variant="outlined" onClick={() => handleClickNovo()}>
					Novo
				</Button>
			</div>
			<form>
				<InputLabel required id="demo-simple-select-label">Data</InputLabel>
                <TextField id="dataHist" required value={formData.dataHist} onChange={e => onChange(e)} placeholder="Data" variant="outlined" margin="dense" fullWidth type={'date'} inputProps={{readOnly: !editMode}}/>
				<InputLabel required id="demo-simple-select-label">Hora</InputLabel>
				<TextField id="horaHist" required value={formData.horaHist} onChange={e => onChange(e)} placeholder="Hora" variant="outlined" margin="dense" fullWidth type={'time'} inputProps={{readOnly: !editMode}}/>
				<TextField id="motivo" value={formData.motivo} onChange={e => onChange(e)} placeholder="Motivo" variant="outlined" margin="dense" label="Motivo" fullWidth type={'text'} inputProps={{readOnly: !editMode}}/>
				<TextField id="medico" value={formData.medico} onChange={e => onChange(e)} placeholder="Médico Responsável" variant="outlined" margin="dense" label="Médico Responsável" fullWidth type={'text'} inputProps={{readOnly: !editMode}}/>
				<TextField id="diagnostico" value={formData.diagnostico} onChange={e => onChange(e)} placeholder="Diagnóstico" variant="outlined" margin="dense" label="Diagnóstico" fullWidth type={'text'} inputProps={{readOnly: !editMode}}/>
				<TextField id="peso" required value={formData.peso} onChange={e => onChange(e)} placeholder="Peso do Animal" variant="outlined" margin="dense" label="Peso do Animal" fullWidth type={'number'} inputProps={{readOnly: !editMode}}/>
				<TextField id="orientacao" value={formData.orientacao} onChange={e => onChange(e)} placeholder="Orientação" variant="outlined" margin="dense" label="Orientação" fullWidth type={'text'} inputProps={{readOnly: !editMode}}/>
				<TextField id="evolucao" value={formData.evolucao} onChange={e => onChange(e)} placeholder="Evolução" variant="outlined" margin="dense" label="Evolução" fullWidth type={'text'} inputProps={{readOnly: !editMode}}/>
				<TextField id="exameComp" value={formData.exameComp} onChange={e => onChange(e)} placeholder="Exames Complementares" variant="outlined" margin="dense" label="Exames Complementares" fullWidth type={'text'} inputProps={{readOnly: !editMode}}/>
			</form>
			{editMode? 
			<div>
				<Button color="secondary" variant="outlined" onClick={() => handleClickCancelar()}>
					Cancelar
				</Button>
				<Button color="primary" onClick={() => onConfirm()} variant="contained">
					Confirmar
				</Button>
			</div>:null}
        </div>
    );
}

export default CadInternamento;