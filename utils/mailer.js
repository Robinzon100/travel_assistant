const sgMail = require("@sendgrid/mail");

sgMail.setApiKey("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");
//d-409275b9852244c6ab5beb34a11fff1b

const resetPasswordMail = (to,token) => {
    const msg = {
        to: to,
        from: "robinzon@gmail.com",
        subject: "reset password",
        text: "mametyna",
        html: `
            <h1>to reset your password plese follow the link bellow</h1>
            <a href="http://localhost:3000/new-password/${token}">reset password</a>
        `
    };
    sgMail.send(msg);
};



const registrationMail = (to) => {
    const msg = {
        to: to,
        from: "robinzon@gmail.com",
        subject: "you have registerd",
        text: "you have successfully registered on travel assistant",
        html: "mametyna"
    };
    sgMail.send(msg);
};



module.exports ={
    resetPasswordMail : resetPasswordMail,
    registrationMail : registrationMail
}