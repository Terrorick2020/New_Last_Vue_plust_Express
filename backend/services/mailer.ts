import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendConfirmationEmail = (to: string, token: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Подтверждение регистрации',
    html: `
      <h1>Подтверждение регистрации</h1>
      <p>Пожалуйста, подтвердите свою регистрацию, перейдя по следующей ссылке:</p>
      <a href="http://${process.env.HOST}:${process.env.PORT}/confirm/${token}">Подтвердить регистрацию</a>
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Ошибка при отправке письма:', err);
    } else {
      console.log('Письмо успешно отправлено:', info.response);
    }
  });
};
