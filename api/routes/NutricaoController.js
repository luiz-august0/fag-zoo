const mysql = require('../config/mysql').pool;

class NutricaoController {
    async show (req, res) {
        try {
            const { id } = req.params;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM nutricaoanimal WHERE Ani_Codigo = ${id}`,
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
            const { ani_codigo, ntr_dia, ntr_hora, ntr_alimento, ntr_unmed, ntr_qtd, ntr_obs } = req.body;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `INSERT INTO nutricaoanimal (Ani_Codigo, NtrAni_Dia, NtrAni_Hora, NtrAni_Alimen, NtrAni_UnMed, NtrAni_Qtd, NtrAni_Obs) ` +
                    `VALUES (${ani_codigo}, "${ntr_dia}", "${ntr_hora}", "${ntr_alimento}", "${ntr_unmed}", ${ntr_qtd}, ${ntr_obs != ''?`"${ntr_obs}"`:'NULL'})`,
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

    async copy(req, res) {
        try {
            const { id_origem } = req.body;
            const { id } = req.params;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `INSERT INTO nutricaoanimal (Ani_Codigo, NtrAni_Dia, NtrAni_Hora, NtrAni_Alimen, NtrAni_UnMed, NtrAni_Qtd, NtrAni_Obs) ` + 
                    `SELECT ${id}, NtrAni_Dia, NtrAni_Hora, NtrAni_Alimen, NtrAni_UnMed, NtrAni_Qtd, NtrAni_Obs ` + 
                    `FROM nutricaoanimal WHERE Ani_Codigo = ${id_origem} `,
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
            const { ani_codigo, ntr_dia, ntr_hora, ntr_alimento, ntr_unmed, ntr_qtd, ntr_obs } = req.body;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `UPDATE nutricaoanimal SET NtrAni_Dia = "${ntr_dia}", NtrAni_Hora = "${ntr_hora}", NtrAni_Alimen = "${ntr_alimento}", NtrAni_UnMed = "${ntr_unmed}", NtrAni_Qtd = ${ntr_qtd}, ` + 
                    `NtrAni_Obs = ${ntr_obs!=''&&ntr_obs!=null?`"${ntr_obs}"`:'NULL'} WHERE NtrAni_Codigo = ${id}`,
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
                    `DELETE FROM nutricaoanimal WHERE NtrAni_Codigo = ${id}`,
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

export default new NutricaoController();