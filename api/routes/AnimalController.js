const mysql = require('../config/mysql').pool;

class AnimalController {
    async index(req, res) {
        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM animal`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }
                        return res.status(201).json(result);
                    }
                )
                conn.release();
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
                    `SELECT * FROM animal WHERE Ani_Codigo = ${id}`,
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
            const { ani_nome, ani_nomecient, ani_apelido, ani_identificacao, ani_sexo, ani_origem } = req.body;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `INSERT INTO animal (Ani_Nome, Ani_NomeCient, Ani_Apelido, Ani_Identificacao, Ani_Sexo, Ani_Origem, Ani_DataAdm, Ani_HoraAdm)` + 
                    `VALUES ("${ani_nome}", ${ani_nomecient != ''?`"${ani_nomecient}"`:'NULL'}, ${ani_apelido != ''?`"${ani_apelido}"`:'NULL'},` +
                    `${ani_identificacao != ''?`"${ani_identificacao}"`:'NULL'}, "${ani_sexo}", ${ani_origem != ''?`"${ani_origem}"`:'NULL'},` + 
                    `NOW(), NOW())`,
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
            const { ani_nome, ani_nomecient, ani_apelido, ani_identificacao, ani_sexo, ani_origem } = req.body;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM animal WHERE Ani_Codigo = "${id}"`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }

                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json();
                        }
                        else {
                            conn.query(
                                `UPDATE animal SET Ani_Nome = "${ani_nome}", Ani_NomeCient = ${ani_nomecient != ''?`"${ani_nomecient}"`:'NULL'}, ` +    
                                `Ani_Apelido = ${ani_apelido != ''?`"${ani_apelido}"`:'NULL'}, ` + 
                                `Ani_Identificacao = ${ani_identificacao != ''?`"${ani_identificacao}"`:'NULL'}, ` + 
                                `Ani_Sexo = "${ani_sexo}", ` + 
                                `Ani_Origem = ${ani_origem != ''?`"${ani_origem}"`:'NULL'} ` + 
                                `WHERE Ani_Codigo = ${id}`,
                            (error, result, fields) => {
                                if (error) { return res.status(500).send({ error: error }) }
                                return res.status(201).json(result);
                            }
                            )
                        }
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
                    `SELECT * FROM animal WHERE Ani_Codigo = "${id}"`,
                    (error, result, fields) => {
                        if (error) { return res.status(500).send({ error: error }) }

                        if (JSON.stringify(result) === '[]') {
                            return res.status(404).json();
                        }
                        
                        conn.query(
                            `DELETE FROM animal WHERE Ani_Codigo = "${id}"`,
                        (error, result, fields) => {
                            if (error) { return res.status(500).send({ error: error }) }
                            return res.status(201).json(result);
                        }
                        )
                       
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

export default new AnimalController();