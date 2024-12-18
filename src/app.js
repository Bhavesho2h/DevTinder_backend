const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();
const validator = require('validator');
const bcrypt = require('bcrypt');

app.use(express.json());
connectDB().then(async () => {
    console.log('connection successfully established');
    await User.syncIndexes();
    app.listen(7777, () => {
        console.log('connnection to server established');
    })
})
    .catch((err) => {
        throw new Error(err, 'coming here');
    })

app.post('/signup', async (req, res) => {
    console.log(req.body, 'what is here');

    const email = req.body.emailId;


    try {
        if (!validator.isEmail(email)) {
            res.send('Invalid Email Address');
            return;
        }
        let e;
        const encryptedpass = bcrypt.hash(req.body.password, 10).then(async function (hash) {
            e = hash;
            console.log(hash, 'encryptedPass');
            const user = new User({
                firstName: req.body.firstName,
                age: req.body.age,
                gender: req.body.gender,
                emailId: req.body.emailId,
                password: e
            });
            console.log(user, 'full user')
            await user.save()
            res.send('User Added Successfully')
        });


    }
    catch (err) {
        res.send('Unable to add User');
    }

})

app.post('/login', async (req, res) => {
    const { emailId, password } = req.body;
    try {
        const user = await User.findOne({ emailId: emailId });
        console.log(user, 'user');
        if (user) {
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            else {
                res.status(200).json({ message: "User logged in successfully" });
            }
        } else {
            res.status(400).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
})


app.get('/user', async (req, res) => {
    const { emailId } = req.body;
    console.log(emailId);
    try {
        const userDetails = await User.findOne({ emailId: emailId })
        res.status(200).send({
            userDetails
        })
    }
    catch (err) {
        throw new Error(err);
    }
})

app.get('/feed', async (req, res) => {
    try {
        const feeddetails = await User.find();
        res.status(200).send({
            feeddetails
        })
    }
    catch (err) {
        throw new Error(err);
    }
})

app.put('/update', async (req, res) => {
    const { firstName, userId } = req.body;
    const id = req.body

    try {
        const updateUser = await User.findByIdAndUpdate(id, { firstName: firstName }, { runValidators: true });
        res.status(200).send({
            message: 'Details Updated Successfully'
        })

    }
    catch (err) {
        throw new Error(err);
    }
})

app.delete('/delete', async (req, res) => {
    const id = req.body.id;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).send({ message: 'User Deleted successfully' })
    }
    catch (err) {
        throw new Error(err);
    }
})

app.patch('/updateUserByEmail', async (req, res) => {
    const emailId = req.body.emailId;

    const firstName = 'wonderful';
    try {
        const details = await User.updateOne({ emailId: emailId }, { firstName: firstName });
        console.log(details, 'is here');
        res.status(200).send({ message: 'updated' })
    }
    catch (err) {
        throw new Error(err);
    }
})

app.patch('/updateUserByID/:userId', async (req, res) => {
    const userId = req.params?.userId;
    console.log(userId, 'coming here is the userId');


    const data = req.body;


    try {

        const ALLOWEDUPDATES = ["about", "skills", "firstName"];
        const isAllowedUpdates = Object.keys(data).every((k) =>

            ALLOWEDUPDATES.includes(k)
        )
        console.log(isAllowedUpdates, 'isAllowedUpdates');
        if (!isAllowedUpdates) {

            res.status(400).send('invalid ');
            return;

        }

        const details = await User.updateOne({ _id: userId }, data);
        console.log(details, 'is here');
        res.status(200).send({ message: 'updated' })
    }
    catch (err) {
        throw new Error(err, 'comning in the catch');
    }
})







