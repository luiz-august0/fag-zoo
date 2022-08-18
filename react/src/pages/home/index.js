import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import './styles.css';
import Image from '../../img/logout.png';
import 'reactjs-popup/dist/index.css';
import Usuario from '../../modals/Usuario';

const Home = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="main-container">
            <div className="cont-second">
                <h2>Inicial</h2>
                <button className='logout-button' onClick={handleLogout}><img src={Image}  className="image-logout" alt="" width={40} height={40}/></button>
            </div>
            <div class="on-screen">
                <div className='bt1'>
                    <Usuario />
                    <button >Cadastro de nutrição</button>
                    <button >Cadastro de acompanhamento médico</button>
                </div>
                <div className='bt2'>
                    <button >Pesquisar animal</button>
                    <button >Cadastro de xxxxxxx</button>
                    <button >Cadastro de enriquecimento ambiental</button>
                </div>
            </div>
        </div>
    );
};

export default Home;