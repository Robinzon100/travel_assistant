// const Joi = require("@hapi/joi");

// exports.userSchema = Joi.object().keys({
//     username: Joi.string()
//         .required()
//         .alphanum()
//         .min(4)
//         .max(30)
//         .error(new Error('username must be valide')),

//     email: Joi.string()
//         .required()
//         .email({ minDomainSegments: 2 })
//         .error(new Error('username must be valide')),

//     password: Joi.string()
//         .required()
//         .regex(/^[a-zA-Z0-9]{5,30}$/)
//         .min(4)
//         .max(30)
//         .error(new Error('username must be valide')),

//     repeatpassword: Joi.string()
//         .required()
//         .regex(/^[a-zA-Z0-9]{5,30}$/),
// });
