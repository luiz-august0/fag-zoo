import React, { useEffect, useState,useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Popup as PopupDesktop } from 'reactjs-popup-normal';
import { Popup as PopupMobile } from 'reactjs-popup-large';
import { mobileDetect } from '../../globalFunctions';
import Button from '@mui/material/Button';
import UploadImagens from "./UploadImagens";
import ViewImagens from "./ViewImagens";
import './PopupImagens.css';

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

const PopupImagens = (idAtividade) => {
    const [ visualMode, setVisualMode ] = useState(true);
    const [ files, setFiles ] = useState([]);
    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject
    } = useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        console.log("accepted", acceptedFiles);
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        );
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
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      },
      [files]
    );

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
                                {isDragActive ? (
                                <p>Drop the files here ...</p>
                                ) : (
                                <p>Drag 'n' drop some files here, or click to select files</p>
                                )}
                            </div>
                            <aside style={thumbsContainer}>{thumbs}</aside>
                            <button onClick={() => alert(files)}> Teste</button>
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
                                {isDragActive ? (
                                <p>Drop the files here ...</p>
                                ) : (
                                <p>Drag 'n' drop some files here, or click to select files</p>
                                )}
                            </div>
                            <aside style={thumbsContainer}>{thumbs}</aside>
                            <button onClick={() => alert(files)}> Teste</button>
                            </section>}
                        </div>
                    </div>
                )}
            </PopupDesktop>
        );
    }
} 

export default PopupImagens;