import { json } from 'body-parser';
import { createPasswordHash } from '../services/auth';

const mysql = require('../mysql').pool;

class UsuarioController {
    async index(req, res) {
        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    'SELECT * FROM usuario',
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        return res.status(201).json(result);
                    }
                )
            })
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async show (req, res) {
        try {
            const { id } = req.params;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM usuario WHERE Usr_Codigo = "${id}"`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        if (!result) {
                            return res.status(404).json();
                        }
                        return res.status(201).json(result);
                    }
                )
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async create(req, res) {
        try {
            const { usuario, senha, setor } = req.body;

            const encryptedPassword = await createPasswordHash(senha);

            mysql.getConnection((error, conn) => {
                conn.query(
                    `INSERT INTO usuario (Usr_Login, Usr_Senha, Usr_Setor) VALUES ("${usuario}","${encryptedPassword}","${setor}")`,
                    (error, result, fields) => {
                        conn.release();
                        if (error) { return res.status(500).send({ error: error }) }
                        return res.status(201).json(result);
                    }
                )
            });

        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { usuario, senha, setor } = req.body;
            const encryptedPassword = await createPasswordHash(senha);

            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM usuario WHERE Usr_Codigo = "${id}"`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }

                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json();
                        }
                        else {
                            conn.query(
                                `UPDATE usuario SET Usr_Login = "${usuario}", Usr_Senha = "${encryptedPassword}", Usr_Setor = "${setor}" WHERE Usr_Codigo = "${id}"`,
                            (error, result, fields) => {
                                conn.release();
                                if (error) { return res.status(500).send({ error: error }) }
                                return res.status(201).json(result);
                            }
                            )
                        }
                    }
                )
            });
            
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }


}

export default new UsuarioController();