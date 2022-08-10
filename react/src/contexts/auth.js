import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api, createSession } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const usuarioRecuperado = localStorage.getItem("usuario");
        const token = localStorage.getItem('token');

        if(usuarioRecuperado && token) {
            setUsuario(JSON.parse(usuarioRecuperado));
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }

        setLoading(false);
    }, []);

    const login = async (usuario, senha) => {
        const response = await createSession(usuario, senha);

        console.log("login", response.data);


        const usuarioLogado = response.data.usuario;
        const token = response.data.token;

        localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
        localStorage.setItem("token", token);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUsuario(usuarioLogado);
        navigate("/");
    };

    const logout = () => {
        console.log("logout");
        
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
        
        api.defaults.headers.Authorization = null;
        
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