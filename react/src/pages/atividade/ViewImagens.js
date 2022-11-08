import React, { useState, useEffect } from 'react';
import { showImagens, api } from '../../services/api';

const ViewImagens = (atividadeID) => {
	const [ imagens, setImagens ] = useState([]);

	const getImagens = async() => {
		const response = await showImagens(atividadeID.atividadeID);
		setImagens(response.data);
	}

    useEffect(() => () => {
		getImagens();
	},[]);

	return (
		<div style={{flex: 1, marginTop: '5%', overflow: 'scroll'}}>
			{imagens.map((e) => {
				const img = `http://localhost:5000/image_uploads/${e.ImgAt_Desc}`;

				return (
					<div>
						<ul>
							<a href={img} target="_blank">
								<img key={e.ImgAt_Desc} src={img} style={{width: '150px', height: '150px'}} alt=""/>
							</a>
						</ul>
					</div>
				)
			})}
		</div>
	)
}

export default ViewImagens;