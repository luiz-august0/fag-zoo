import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import './styles.css';
import Image from '../../img/logout.png';

import { getUsuarios } from '../../services/api';

const Home = () => {
    const { logout } = useContext(AuthContext);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {
        (async () => {
            const response = await getUsuarios();
            setUsuarios(response.data);
            setLoading(false);
        })();
    }, []);

    const handleLogout = () => {
        logout();
    };

    if (loading) {
        return <div className="loading">Carregando dados...</div>;
    }

    return (
        <div className="main-container">
            <div className="cont-second">
                <h2>inittal</h2>
                <button className='logout-button' onClick={handleLogout}><img src={Image}  className="image-logout" alt="" width={40} height={40}/></button>
            </div>
            <div class="on-screen">

            </div>
        </div>
    );
};

export default Home;

/* exemplo para trazer objetos do backend
<ul>
                {
                    usuarios.map((usuario) => (
                        <li key={usuario.Usr_Codigo}>
                            {usuario.Usr_Codigo} - {usuario.Usr_Login}
                        </li>
                    ))
                }
            </ul>
*/ 