const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = ({ email, name }) => {
  sgMail.send({
    to: email,
    from: "yoni29396@gmail.com",
    subject: "Welcome to TaskManager app",
    text: `Hello ${name}, we are very happy to have you in the app`,
  });
};

const cancelationEmail = ({ email, name }) => {
  sgMail.send({
    to: email,
    from: "yoni29396@gmail.com",
    subject: `very sad to see you leave ${name}`,
    text: `If there is somthing we can do let us know!`,
  });
};

module.exports = {
  sendWelcomeEmail,
  cancelationEmail
};
