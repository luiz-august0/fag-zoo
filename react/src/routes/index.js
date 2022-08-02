import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/login/index";
import Home from "../pages/home/index";
import { AuthContext } from "../contexts/auth"; 

const Rotas = () => {
    const [usuario, setUsuario] = useState(null);

    const login = (usuario, senha) => {

    }

    const logout = () => {};

    return (
        <BrowserRouter>
            <AuthContext.Provider 
                value={{authenticated: !!usuario, usuario, login,
                logout }}>
                <Routes>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/" element={<Home/>}/>
                </Routes>
            </AuthContext.Provider>
        </BrowserRouter>
    );
};

export default Rotas;
 