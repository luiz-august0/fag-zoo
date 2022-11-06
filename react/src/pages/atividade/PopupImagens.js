import React, { useEffect, useState,useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Popup as PopupDesktop } from 'reactjs-popup-normal';
import { Popup as PopupMobile } from 'reactjs-popup-large';
import { mobileDetect } from '../../globalFunctions';
import Button from '@mui/material/Button';
import ViewImagens from "./ViewImagens";
import './PopupImagens.css';
import { createImagemAtt } from "../../services/api";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16
  };
  
  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box"
  };
  
  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
  };
  
  const img = {
    display: "block",
    width: "auto",
    height: "100%"
  };
  
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out"
  };
  
  const activeStyle = {
    borderColor: "#2196f3"
  };
  
  const acceptStyle = {
    borderColor: "#00e676"
  };
  
  const rejectStyle = {
    borderColor: "#ff1744"
  };

const PopupImagens = (atividadeID) => {
    const MySwal = withReactContent(Swal);
    const [ visualMode, setVisualMode ] = useState(true);
    const [ files, setFiles ] = useState([]);
    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject
    } = useDropzone({
      accept: {
        'image/*': ['.jpeg', '.png']
      },
      onDropAccepted: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        );
      },
      onDropRejected: () => {
        MySwal.fire({
          html: <i>Arquivo não suportado!</i>,
          icon: 'error'
        })
      }
    });
  
    const style = useMemo(
      () => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }),
      [isDragActive, isDragReject, isDragAccept]
    );
  
    const thumbs = files.map((file) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img alt="selected" src={file.preview} style={img} />
        </div>
      </div>
    ));
  
    useEffect(
      () => () => {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      },
      [files]
    );

    const handleSubmit = () => {
      try {
        files.map(async(e) => {
            const formData = new FormData();
            formData.append("file", e);
            await createImagemAtt(atividadeID.atividadeID, formData);
            MySwal.fire({
              html: <i>Imagens enviadas com sucesso!</i>,
              icon: 'success'
            });
            setFiles([]);
            setVisualMode(true);
        })
      } catch (error) {
          MySwal.fire({
            html: <i>Ocorreu algum erro!</i>,
            icon: 'error'
          }); 
      }
    }

    if (mobileDetect() === true) {
        return (
            <PopupMobile
                trigger={<Button variant="outlined" color="primary">Imagens</Button>}
                modal
                nested
                >
                {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header">Imagens</div>
                        <div className="content">
                            <Button variant="outlined" color="primary" onClick={() => setVisualMode(true)}>Visualizar imagens</Button>
                            <Button variant="outlined" color="primary" onClick={() => setVisualMode(false)}>Enviar imagens</Button>
                            {visualMode?<ViewImagens/>:
                            <section className="container">
                            <div {...getRootProps({ className: "dropzone", style })}>
                                <input {...getInputProps()} />
                                {!isDragActive ? (
                                <p>Arraste arquivos aqui, ou clique para selecionar arquivos</p>
                                ):null}
                                {isDragActive && isDragAccept ? (
                                <p>Arraste arquivos aqui...</p>
                                ):null}
                                {isDragActive && isDragReject ? (
                                <p>Arquivo não suportado</p>
                                ):null}
                            </div>
                            <aside style={thumbsContainer}>{thumbs}</aside>
                            <Button variant="text" color="primary" onClick={() => handleSubmit()}>Confirmar</Button>
                            <Button variant="text" color="error" onClick={() => setFiles([])}>Cancelar</Button>
                            </section>}
                        </div>
                    </div>
                )}
            </PopupMobile>
        );
    } else {
        return (
            <PopupDesktop
                trigger={<Button variant="outlined" color="primary">Imagens</Button>}
                modal
                nested
                >
                {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header">Imagens</div>
                        <div className="content">
                            <Button variant="outlined" color="primary" onClick={() => setVisualMode(true)}>Visualizar imagens</Button>
                            <Button variant="outlined" color="primary" onClick={() => setVisualMode(false)}>Enviar imagens</Button>
                            {visualMode?<ViewImagens/>:
                            <section className="container">
                            <div {...getRootProps({ className: "dropzone", style })}>
                                <input {...getInputProps()} />
                                {!isDragActive ? (
                                <p>Arraste arquivos aqui, ou clique para selecionar arquivos</p>
                                ):null}
                                {isDragActive && isDragAccept ? (
                                <p>Arraste arquivos aqui...</p>
                                ):null}
                                {isDragActive && isDragReject ? (
                                <p>Arquivo não suportado</p>
                                ):null}
                            </div>
                            <aside style={thumbsContainer}>{thumbs}</aside>
                            <Button variant="text" color="primary" onClick={() => handleSubmit()}>Confirmar</Button>
                            <Button variant="text" color="error" onClick={() => setFiles([])}>Cancelar</Button>
                            </section>}
                        </div>
                    </div>
                )}
            </PopupDesktop>
        );
    }
} 

export default PopupImagens;