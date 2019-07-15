const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const config = require("config");

console.log(config.get("EMAIL_DOMAIN"));

const auth = {
  auth: {
    api_key: config.get("EMAIL_API_KEY"),
    domain: config.get("EMAIL_DOMAIN")
  },
  host: "api.mailgun.net"
};
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

class EmailService {
  static sendEmail(order) {
    nodemailerMailgun.sendMail(
      {
        from: "sagar.basavaraj@gmail.com",
        to: "mysapna.j@gmail.com",
        subject: `Thank you for the order: ${order._id}`,
        html: `<p>Thanks for the order. <br> <below are the order details</p><br><dl><dt>Name</dt><dd>${
          order.name
        }</dd><dt>Type</dt><dd>${order.type}</dd></dl>`
      },
      (err, info) => {
        if (err) {
          console.log(`Error: ${err}`);
        } else {
          console.log(`Response: ${info}`);
        }
      }
    );
  }
}

module.exports = EmailService;
