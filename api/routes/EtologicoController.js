const mysql = require('../config/mysql').pool;

class EtotologicoController {
    async show (req, res) {
        try {
            const { id } = req.params;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `SELECT * FROM historicoEtologico WHERE Ani_Codigo = ${id}`,
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
            const { codigoAni, comp, outrComp, obs, dataHist, hora, resp } = req.body;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `INSERT INTO historicoEtologico (Ani_Codigo, HsEt_Comp, HsEt_OutrComp, HsEt_Obs, HsEt_Data, HsEt_Hora, HsEt_Resp) ` +
                    `VALUES (${codigoAni}, "${comp}", ${outrComp!=''?`"${outrComp}"`:'NULL'}, ${obs!=''?`"${obs}"`:'NULL'}, "${dataHist}", "${hora}", "${resp}")`,
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
            const { comp, outrComp, obs, dataHist, hora, resp } = req.body;

            mysql.getConnection((error, conn) => {
                conn.query(
                    `UPDATE historicoEtologico SET HsEt_Comp = "${comp}", HsEt_OutrComp = ${outrComp!=''&&outrComp!=null?`"${outrComp}"`:'NULL'}, ` + 
                    `HsEt_Obs = ${obs!=''&&obs!=null?`"${obs}"`:'NULL'}, ` +  
                    `HsEt_Data = "${dataHist}", HsEt_Hora = "${hora}", HsEt_Resp = "${resp}" WHERE HsEt_Codigo = ${id}`,
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
                    `DELETE FROM historicoEtologico WHERE HsEt_Codigo = ${id}`,
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

export default new EtotologicoController();