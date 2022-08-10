import React, { useState, useContext } from 'react';
import './styles.css';
import { AuthContext } from '../../contexts/auth';
import Image from '../../img/image.png';

const Login = () => {
    const { login } = useContext(AuthContext);

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState(""); 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit", {usuario, senha});
        login(usuario, senha);
    };

    return (
        <div id="login">
            <img src={Image} alt=""/>
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <label className="lbUsuario" htmlFor="usuario">Usuario</label>
                    <input 
                        type="text" 
                        name="usuario" 
                        id="usuario"
                        value={usuario} 
                        onChange={(e) => setUsuario(e.target.value)} 
                    />
                </div>
                <div className="field">
                    <label className="lbSenha" htmlFor="senha">Senha</label>
                    <input 
                        type="password" 
                        name="senha" 
                        id ="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <div className="actions">
                    <button type="submit">ENTRAR</button>                
                </div>
            </form>
        </div>
    );
};

export default Login;