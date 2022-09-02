import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { useNavigate } from "react-router-dom";
import './styles.css';
import Image from '../../img/logout.png';
import 'reactjs-popup-normal/dist/index.css';

import Usuario from '../../modals/Usuario';
import Animal from '../../modals/Animal';

const Home = () => {

    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="main-container">
            <div className="cont-second">
                <h2>Inicio</h2>
                <button className='logout-button' onClick={handleLogout}><img src={Image}  className="image-logout" alt="" width={40} height={40}/></button>
            </div>
            <div class="on-screen">
                <div className='bt1'>
                    <Usuario/>
                    <Animal/>
                    <button onClick={() => navigate("/nutricao")}>Nutrição</button>
                </div>
                <div className='bt2'>

                </div>
            </div>
        </div>
    );
};

export default Home;