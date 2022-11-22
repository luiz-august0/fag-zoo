const mysql = require('../config/mysql').pool;

class UsuarioController {
    async index(req, res) {
        try {
            const { id } = req.params;
            
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM historicoAnimal WHERE Ani_Codigo = ${id}`,
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
                    `SELECT * FROM historicoAnimal WHERE HsAni_Codigo = ${id}`,
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
            const { codigoAni, dataHist, horaHist, motivo, medico, diagnostico, peso, orientacao, evolucao, exameComp } = req.body;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `INSERT INTO historicoAnimal (Ani_Codigo, HsAni_Data, HsAni_Hora, HsAni_MtvInt, HsAni_Medico, HsAni_Diag, HsAni_Peso, HsAni_Orient, HsAni_Evl, HsAni_ExComp) ` +
                    `VALUES (${codigoAni}, "${dataHist}", "${horaHist}", ${motivo!=''?`"${motivo}"`:'NULL'}, ${medico!=''?`"${medico}"`:'NULL'}, ${diagnostico!=''?`"${diagnostico}"`:'NULL'}, ` + 
                    `${peso}, ${orientacao!=''?`"${orientacao}"`:'NULL'}, ${evolucao!=''?`"${evolucao}"`:'NULL'}, ${exameComp!=''?`"${exameComp}"`:'NULL'})`,
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
            const { dataHist, horaHist, motivo, medico, diagnostico, peso, orientacao, evolucao, exameComp } = req.body;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `UPDATE historicoAnimal SET HsAni_Data = "${dataHist}", HsAni_Hora = "${horaHist}", HsAni_MtvInt = ${motivo!=''?`"${motivo}"`:'NULL'}, ` + 
                    `HsAni_Medico = ${medico!=''?`"${medico}"`:'NULL'}, HsAni_Diag = ${diagnostico!=''?`"${diagnostico}"`:'NULL'}, HsAni_Peso = ${peso}, ` + 
                    `HsAni_Orient = ${orientacao!=''?`"${orientacao}"`:'NULL'}, HsAni_Evl = ${evolucao!=''?`"${evolucao}"`:'NULL'}, ` + 
                    `HsAni_ExComp = ${exameComp!=''?`"${exameComp}"`:'NULL'} WHERE HsAni_Codigo = ${id}`,
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
                    `DELETE FROM historicoAnimal WHERE HsAni_Codigo = ${id}`,
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

export default new UsuarioController();