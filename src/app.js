const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();

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
    const user = new User({
        firstName: 'Hellboy',
        lastName: 'Xerxes',
        age: '23',
        gender: 'male'

    })

    await user.save()
    res.send('User Added Successfully')
})




