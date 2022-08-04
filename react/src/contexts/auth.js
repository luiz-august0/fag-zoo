import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);

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
        setUsuario(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider 
        value={{authenticated: !!usuario, usuario, login,
        logout}}
        >
            {children}
        </AuthContext.Provider>
    );
};