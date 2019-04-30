const Users = require('../models/users');
const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    birthyear: Joi.number().integer().min(1900).max(2019)
}).with('username', 'birthyear').without('password', 'access_token');


// Return result.
const result = Joi.validate({ username: 'abc', birthyear: 1994 }, schema);
// result.error === null -> valid

// You can also pass a callback which will be called synchronously with the validation result.
Joi.validate({ username: 'abc', birthyear: 1994 }, schema, function (err, value) { });  // err === null -> valid






exports.getRegistration = (req, res, next) => {
    res.render('register', {
        pageTitle: "travel assistant", 
        path: '/register',
        errors: []
    });
}

exports.postRegistration = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const repeatpassword = req.body.repeatpassword;

    console.log(password);
    console.log(repeatpassword);


    let errors = [];


    // check if the info is full
    if (username == ' ' || email == ' ' || password == ' ' || repeatpassword == ' ') {
        errors.push("please enter in the fields");
    }

    // checks the password length
    if (password.length <= 4) {
        errors.push("password too short");
    }

    // check if the passwords matches
    if (password != repeatpassword) {
        errors.push("the passwords doesnt match");
    }


    // check if the ERROR array is emty
    if (errors.length > 0) {
        res.render('register', {
            pageTitle: "travel assistant",
            path: '/register',
            errors: errors
        });

    }
    // check if the ERROR array is emty SO THAT IT CAN CONTINUE IN DB
    else {
        const user = new Users(username, email, password);

        user.save()
            .then(users => {
                res.redirect('/tours');
            })
            .catch(err => {
                console.log(err);
            })
    }
}