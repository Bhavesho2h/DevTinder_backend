const express = require('express');
const app = express();

app.get('/user', (req, res, next) => {
    console.log('this is route 1');
    next();
    // res.send('first route successfully lauched');

},
    [(req, res, next) => {
        console.log('this is the route 2');
        res.send('Second route successfully launced');
    }]
)


app.listen(7777);
