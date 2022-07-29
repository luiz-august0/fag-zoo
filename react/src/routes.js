import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/login/index";

const Rotas = () => {
   return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />}/>
            </Routes>
        </BrowserRouter>
   )
}

export default Rotas;
