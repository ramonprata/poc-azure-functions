const nodemailer = require('nodemailer');
const { EMAIL_ACCOUNT, EMAIL_PSW, EMAIL_SERVICE } = require('./constants');

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_ACCOUNT,
    pass: EMAIL_PSW,
  },
});

const mailOptions = {
  from: EMAIL_ACCOUNT,
  to: 'ramon.prata@dtidigital.com.br',
  subject: 'Sending Email using Node.js',
  text: '',
};

const sendEmail = (notification, callback) => {
  transporter.sendMail(
    {
      ...mailOptions,
      text: `Notificação criada: ${notification.insertedId}`,
      html: `
  <p>Descrição: ${notification.description}</p>
  <a href=${notification.fileURI}>Clique aqui para ver o arquivo</a>
  `,
    },
    callback
  );
};

module.exports = {
  sendEmail,
};
