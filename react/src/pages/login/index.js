import React, { useState, useContext } from 'react';
import './styles.css';
import { AuthContext } from '../../contexts/auth';
import Image from '../../img/image.png';


const Login = () => {
    
    const { login } = useContext(AuthContext);
    
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState(""); 
    const [msgErro, setMsgErro] = useState("");
    
    const recebeMsgErro = (erro) => {
        setMsgErro(erro);
    }

    const mensagemErro = (erro) => {
        return (
            <h4>{erro}</h4>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (usuario === '' && senha === '') {
            recebeMsgErro('Usuário e senha deve ser informado');
            return;
        }
        
        login(usuario, senha);
     
    }
      
    return (
        <div id="login">
            <img src={Image} alt=""/>
            <form className="form">
                <div className="field">
                <div className="div-erro">
                    {mensagemErro(msgErro)}
                </div>
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
                    <button type="submit" onClick={handleSubmit}>ENTRAR</button>                
                </div>
            </form>
        </div>
    );
};

export default Login;