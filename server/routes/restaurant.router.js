const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/restaurant', (req, res) => {
    console.log('/restaurant GET hit');
    pool.query('SELECT * FROM "restaurants"')
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log('error with restaurant select', error);
            res.sendStatus(500);
        })
})

router.post('/restaurant', (req, res) => {
    console.log('in POST route /restaurant with:', req.body);
    pool.query(`INSERT INTO "restaurants" ("name", "type")
    VALUES ( $1, $2 );`, [req.body.name, req.body.type])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error with restaurant insert', error);
            res.sendStatus(500);
        })

})// end post

module.exports = router; 