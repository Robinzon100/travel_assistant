const Joi = require("@hapi/joi");

exports.userSchema = Joi.object().keys({
    username: Joi.string()
        .required()
        .alphanum()
        .min(4)
        .max(30)
        .error(errors => {
            return {
                message: "Coins is required."
            };
        }),

    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2 }),
    password: Joi.string()
        .required()
        .regex(/^[a-zA-Z0-9]{5,30}$/),
    repeatpassword: Joi.string()
        .required()
        .regex(/^[a-zA-Z0-9]{5,30}$/)
});
