import nodemailer from 'nodemailer';

let transporter = null;

export const getTransporter = () => {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    // Fallback: a fake transport that logs to console
    transporter = {
      sendMail: async (opts) => {
        console.log('\n[MAIL LOG]\n', JSON.stringify(opts, null, 2));
        return { messageId: 'console-logged' };
      }
    };
    return transporter;
  }
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
  return transporter;
};

export const sendMail = async ({ to, subject, html, text }) => {
  const from = process.env.MAIL_FROM || 'no-reply@taskmanager.local';
  const t = getTransporter();
  return t.sendMail({ from, to, subject, html, text });
};
