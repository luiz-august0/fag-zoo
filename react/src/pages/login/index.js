import React, { useState } from 'react';
import './styles.css';

const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState(""); 

    const handleSubmit = (e) => {
        e.preventDeafault();

        console.log("submit");
    }

    return (
        <div id="login">
            <h1 className="title">Login</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="usuario">Usuario</label>
                    <input 
                        type="usuario" 
                        name="usuario" 
                        id="usuario"
                        value={usuario} 
                        onChange={(e) => setUsuario(e.target.value)} 
                    />
                </div>
                <div className="field">
                    <label htmlFor="senha">Senha</label>
                    <input 
                        type="password" 
                        name="senha" 
                        id ="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <div className="actions">
                    <button type="submit">Entrar</button>                
                </div>
            </form>
        </div>
    );
};

export default Login;