const sgMail = require("@sendgrid/mail");

sgMail.setApiKey("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");


const resetPasswordMail = (to,token) => {
    const msg = {
        to: to,
        from: "robinzon@gmail.com",
        subject: "reset password",
        text: "mametyna",
        html: `
            <h1>to reset your password plese follow the link bellow</h1>
            <a href="http://localhost:3000/reset-password/${token}"></a>
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