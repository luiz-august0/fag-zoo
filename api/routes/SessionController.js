import jwt from "jsonwebtoken";
import { checkPassword } from "../services/auth";
import authConfig from "../config/auth";

class SessionController {
    async create(req, res) {
        try {
            const { usuario, senha } = req.body;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM usuario WHERE Usr_Login = "${usuario}"`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        
                        if (!result) {
                            return res.status(404).json({ error: "Usuário ou senha inválidos." });
                        }

                        if (!checkPassword(usuario, senha)) {
                            return res.status(401).json({ error: "Usuário ou senha inválidos." });
                        }

                        const { id } = usuario;

                        return res.json({
                            usuario: {
                                id,
                                usuario
                            },
                            token: jwt.sign({ id }, authConfig.secret, {
                                expiresIn: authConfig.expiresIn
                            })
                        });
                    }
                )
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}

export default new SessionController();