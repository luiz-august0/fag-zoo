import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/index";
import Home from "../pages/home/index";

const Private = ({ Item }) => {
    const logado = false;

    return logado > 0 ? <Item/> : <Login/>;
};

const Rotas = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/home" element={<Private Item={Home}/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="*" element={<Login/>}/>
        </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
