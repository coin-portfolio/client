import nodemailer from 'nodemailer';

export type EmailData = {
  email: string;
  authNumber: string;
};

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NEXT_PUBLIC_NODE_MAILER_ID,
    pass: process.env.NEXT_PUBLIC_NODE_MAILER_PASSWORD,
  },
});
