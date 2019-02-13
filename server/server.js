const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const pg = require('pg');
const pool = pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'restaurant',
    max: 10,
    idleTimeoutMillis: 30000

});

pool.on('connect', () => {
    console.log('Postgresql connected');

})
pool.on('error', (error) => {
    console.log('Error with Postgresql', error);

})

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/restaurant', (req, res) => {
    console.log('/restaurant GET hit');
    pool.query('SELECT * FROM "restaurants"')
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log('error with restaurant select', error);
            res.sendStatus(500);
        })
})

app.post('/restaurant', (req, res) => {
    console.log('in POST route /restaurant with:', req.body);

    pool.query(`INSERT INTO "restaurants" ("name", "type")
    VALUES ( $1, $2 );`, [req.body.name, req.body.type ])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error with restaurant insert', error);
            res.sendStatus(500);
        })

})// end post



app.listen(PORT, () => {
    console.log('listening on port', PORT);
});//end app listen