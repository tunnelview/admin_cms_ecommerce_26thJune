import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
const sendMail = (emailInfo)=> {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_SMTP,
    port: +process.env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAILID_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(emailInfo);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

const sendAdminUserVerificationMail = (userObj) =>{
    const link = '${DOMAIN}/admin-verification?e=${userObj.email} &c=${userObj.verficationCode}';

    const emailInfo = {
        from: '"Fred Foo 👻" ' + process.env.MAIL_USER, // sender address
    to: userObj.email, // list of receivers
    subject: "Account verfication required", // Subject line
    text: `Hi ${userObj.fName} please follow the link to activate your admin account. ${link}`, // plain text body
    html: `
    <p>hello ${userObj.fName} </p>
    <br/>
    <br/>
    ${link}

    <p>
    --------------

    <br/>
    xyz commerce
    </p>
    `, //html body


    };

    sendMail(emailInfo)
}
