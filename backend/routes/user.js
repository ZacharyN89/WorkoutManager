const router = require('express').Router();
let User = require('../models/user.model.js');

router.route('/').get((req, res) => {
    User.find({})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: +' + err));
});

router.route('/:email').get((req, res) => {
    var email = req.body.email;
    User.findOne({email: email})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: +' + err));
});

router.route('/add').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const fName = req.body.fName;
    const lName = req.body.lName;

    const newUser = new User({email,password,fName,lName})

    newUser.save()
    .then(() => res.json("USER ADDED"))
    .catch(err => res.status(400).json('Error: +' + err));
});

router.route('/login').post((req, res) => {
    // Not sure why this actually doesn't need to use findUser... But it works I guess? I'll ask questions later
    const findUser = User.findOne({email: req.body.email})
    .then(users => res.json(users)) // This outputs the json
    .catch(error => res.status(400).json('Error: +' +error)) // Catches any errors that occur
});

router.route('/update/:email').post((req, res) => {
    var email = req.body.email;
    User.findOne({email: email})
    .then((user) => {
        user.password = req.body.password;
        user.fName = req.body.fName;
        user.lName = req.body.lName;

        user.save()
            .then(() => res.json("USER UPDATED!"))
            .catch(err => res.status(400).json('Error: +' + err));
    })
    .catch(err => res.status(400).json('Error: +' +err));
});

router.route('/delete/:email').delete((req, res) => {
    var email = req.body.email;
    User.findOneAndDelete({email: email})
    .then(() => res.json("USER DELETED!"))
    .catch(err => res.status(400).json('Error: +' + err));
    //should be updated to delete all exercises associated with user as well. probably easier to manage taht in front end though
});

module.exports = router;