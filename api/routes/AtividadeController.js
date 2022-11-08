const mysql = require('../config/mysql').pool;

class AtividadeController {
    async postImageAtt (id, filename) {
        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `INSERT INTO imagensAtividade VALUES(${id}, "${filename}")`
                )
                conn.release();
            });
        } catch (err) {
            console.error(err);
        }
    }

    async showImagens (req, res) {
        try {
            const { id } = req.params;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM imagensatividade WHERE Ativ_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        if (!result) {
                            return res.status(404).json();
                        }
                        return res.status(201).json(result);
                    }
                )
                conn.release();
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });  
        }
    }

    async show (req, res) {
        try {
            const { id } = req.params;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM atividadeAnimal WHERE Ani_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        if (!result) {
                            return res.status(404).json();
                        }
                        return res.status(201).json(result);
                    }
                )
                conn.release();
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async create(req, res) {
        try {
            const { codigoAni, descricao, dataAtt, hora, resp, interacao } = req.body;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `INSERT INTO atividadeAnimal (Ani_Codigo, Ativ_Desc, Ativ_Data, Ativ_Hora, Ativ_Resp, Ativ_Interacao) ` +
                    `VALUES (${codigoAni}, "${descricao}", "${dataAtt}", "${hora}", "${resp}", "${interacao}")`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        if (!result) {
                            return res.status(404).json();
                        }
                        return res.status(201).json(result);
                    }
                )
                conn.release();
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { descricao, dataAtt, hora, resp, interacao } = req.body;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `UPDATE atividadeAnimal SET Ativ_Desc = "${descricao}", Ativ_Data = "${dataAtt}", Ativ_Hora = "${hora}", ` + 
                    `Ativ_Resp = "${resp}", Ativ_Interacao = "${interacao}" ` +  
                    `WHERE Ativ_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        return res.status(201).json(result);
                    }
                )                       
                conn.release();
            });
            
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `DELETE FROM atividadeAnimal WHERE Ativ_Codigo = ${id}`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        return res.status(201).json(result);
                    }
                )                       
                conn.release();
            });
            
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}

export default new AtividadeController();