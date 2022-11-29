const mysql = require('../config/mysql').pool;

class MonitoramentosController {
    async show (req, res) {
        try {
            const { id } = req.params;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT HM.*, CONCAT(M.Codigo, " - ", M.Descricao) AS Monitoracao FROM historicoMonitoracao HM ` + 
                    `INNER JOIN monitoracoes M ON HM.HsMo_Tipo = M.Codigo ` + 
                    `WHERE HM.HsAni_Codigo = ${id}`,
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
            const { historicoID, tipo, hora, resultado } = req.body;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `INSERT INTO historicoMonitoracao (HsAni_Codigo, HsMo_Tipo, HsMo_Hora, HsMo_Result) ` +
                    `VALUES (${historicoID}, "${tipo}", "${hora}", ${resultado})`,
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
            const { tipo, hora, resultado } = req.body;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `UPDATE historicoMonitoracao SET HsMo_Tipo = "${tipo}", HsMo_Hora = "${hora}", HsMo_Result = ${resultado} ` +
                    `WHERE HsMo_Codigo = ${id}`,
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

    async destroy(req, res) {
        try {
            const { id } = req.params;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `DELETE FROM historicoMonitoracao WHERE HsMo_Codigo = ${id}`,
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

    async getMonitoracoesCod(req, res) {
        try {
            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM monitoracoes`,
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

export default new MonitoramentosController();