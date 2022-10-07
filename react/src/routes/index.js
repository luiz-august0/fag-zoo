import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/login/index";
import Home from "../pages/home/index";
import Nutricao from "../pages/nutricao/index";
import Etologico from "../pages/etologico";
import { AuthProvider, AuthContext } from "../contexts/auth";

const Rotas = () => {
    const Private = ({children}) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando...</div>
        }

        if(!authenticated) {
            return <Navigate to="/login" />
        }

        return children;
    }

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/" 
                    element={
                    <Private>
                        <Home/>
                    </Private>}
                    />
                    <Route exact path="/nutricao" 
                    element={
                    <Private>
                        <Nutricao/>
                    </Private>}
                    />
                    <Route exact path="/etologico" 
                    element={
                    <Private>
                        <Etologico/>
                    </Private>}
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default Rotas;