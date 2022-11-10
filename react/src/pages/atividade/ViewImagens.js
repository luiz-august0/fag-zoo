import React, { useState, useEffect } from 'react';
import { showImagens, deleteImagemAtt } from '../../services/api';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ViewImagens = (atividadeID) => {
	const [ imagens, setImagens ] = useState([]);
	const MySwal = withReactContent(Swal);

	const getImagens = async() => {
		const response = await showImagens(atividadeID.atividadeID);
		setImagens(response.data);
	}

    useEffect(() => () => {
		getImagens();
	},[]);

	const deleteImage = async(arquivo) => {
		try {
			await deleteImagemAtt(atividadeID.atividadeID, arquivo);
			MySwal.fire({
				html: <i>Imagem excluída com sucesso!</i>,
				icon: 'success'
			});
			getImagens();
		} catch (error) {
			MySwal.fire({
				html: <i>Ocorreu algum erro ao excluir a imagem</i>,
				icon: 'error'
			});
		}
	}

	return (
		<div style={{marginTop: '5%'}}>
			{JSON.stringify(imagens) == '[]' ? <p>Não há dados para mostrar!</p>:null}
			{imagens.map((e) => {
				const img = `http://localhost:5000/image_uploads/${e.ImgAt_Desc}`;
				const arquivo = e.ImgAt_Desc;

				return (
					<div style={{flex: 1, alignItems:'center', alignContent: 'center', justifyContent: 'center'}}>
						<ul>
							<a href={img} target="_blank">
								<img key={e.ImgAt_Desc} src={img} style={{width: '150px', height: '150px'}} alt=""/>
							</a>
							<Button style={{left: '1rem', bottom: '3.5rem'}} onClick={() => deleteImage(arquivo)} variant="outlined" color="error" >Excluir</Button>
						</ul>
					</div>
				)
			})}
		</div>
	)
}

export default ViewImagens;