import React from "react";

const Usuario = ({ usuarios, onDeleteUsuario }) => {
    return (
        <div className="usuarios">
            <h2 className="title">Usuários</h2>
            <ul className="list">
                {
                    usuarios.map((usuario) => (
                        <li className="item" key={usuario.Usr_Codigo}>
                            <div className="info">
                                <div className="usuario-login">Usuário: {usuario.Usr_Login}</div>
                                <div className="usuario-setor">Setor: {usuario.Str_Descricao}</div>
                            </div>
                            <button onClick={() => onDeleteUsuario(null)}>Exluir</button>
                            <button>Editar</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Usuario;