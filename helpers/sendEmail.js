const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "Okazimiriv@meta.ua" };
    await sgMail.send(email);
    console.log("Email sent");
    return true;
  } catch (error) {
    throw error;
  }
};

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

module.exports = sendEmail;
