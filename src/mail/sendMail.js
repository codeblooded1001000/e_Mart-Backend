const nodemailer = require('nodemailer');

const sendMail = async(email)=>{

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'myecom931@gmail.com',
    pass: 'lwacxrcqmskljlsv'
  }
});

let mailOptions = {
  from: '"My Ecom" <myecom931@gmail.com>',
  to: email,
  subject: 'Your order has been successfully placed ✔',
  text: 'Order has been placed',
  html: '<b>Thanks for Ordering from us</b>'
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info);
});
}

module.exports = sendMail