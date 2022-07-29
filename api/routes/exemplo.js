const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM FORMULARIO',
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(201).send(resultado)
            }
        )
    })
});

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO FORMULARIO (FORM_DEPARTAMENTO, FORM_FORMULARIO) VALUES (?,?)',
            [req.body.departamento, req.body.formulario],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    if (error) { return res.status(500).send({ error: error }) }
                }
                res.status(201).send({
                    mensagem: 'Formulário inserido com sucesso!',
                    FORM_ID: resultado.insertId
                });
            }
        );
    });


});

router.get('/:FORM_DEPARTAMENTO', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT F.*, D.DEP_DESCRICAO FROM FORMULARIO F INNER JOIN DEPARTAMENTO D ON D.DEP_ID = F.FORM_DEPARTAMENTO WHERE FORM_DEPARTAMENTO = ?',
            [req.params.FORM_DEPARTAMENTO],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(201).send(resultado)
            }
        )
    })
})

    router.delete('/', (req, res, next) => {
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error }) }
            conn.query(
                `DELETE FROM FORMULARIO WHERE FORM_ID = ?`,
                [req.body.FORM_ID],
                (error, resultado, fields) => {
                    if (error) { return res.status(500).send({ error: error }) }

                    res.status(202).send({
                        mensagem: 'Formulário excluido com sucesso!',
                        FORM_ID: req.body.FORM_ID
                    })
                }
            )
        })
    })

module.exports = router;