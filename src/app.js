const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();

app.use(express.json());
connectDB().then(() => {
    console.log('connection successfully established');
    app.listen(7777, () => {
        console.log('connnection to server established');
    })
})
    .catch((err) => {
        throw new Error(err, 'coming here');
    })

app.post('/signup', async (req, res) => {
    console.log(req.body,'what is here');
    const user = new User(req.body);


    try{    
        await user.save()
        res.send('User Added Successfully')
     }
     catch(err) {
        res.send('Unable to add User');
     }
   
})




