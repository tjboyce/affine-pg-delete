const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const pool = require('./modules/pool.js');
const restaurantRouter = require('./routes/restaurant.router.js');


app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', restaurantRouter );






app.listen(PORT, () => {
    console.log('listening on port', PORT);
});//end app listen