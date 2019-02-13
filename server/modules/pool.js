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

module.exports = pool; 