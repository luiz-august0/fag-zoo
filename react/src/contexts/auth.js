import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const usuarioRecuperado = localStorage.getItem("usuario");

        if(usuarioRecuperado) {
            setUsuario(JSON.parse(usuarioRecuperado));
        }

        setLoading(false);
    }, []);

    const login = (usuario, senha) => {

        console.log("login", { usuario, senha});

        const usuarioLogado = {
           id: "123",
           usuario, 
        };

        localStorage.setItem("usuario", JSON.stringify(usuarioLogado));

        if(senha === "admin"){
            setUsuario({ id: "123", usuario });
            navigate("/");
        }
    };

    const logout = () => {
        console.log("logout");
        localStorage.removeItem('usuario');
        setUsuario(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider 
        value={{authenticated: !!usuario, usuario, loading, login,
        logout}}
        >
            {children}
        </AuthContext.Provider>
    );
};