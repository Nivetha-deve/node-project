import nodemailer from "nodemailer";

import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "nivethashree015@gmail.com",
        pass: process.env.MAIL_PASS || "",
    },
});

const mailOptions = {
    from: "nivethashree015@gmail.com",
    to:["nivethashree028@gmail.com"],
    subject:"Email Testing",
    text: "sending mails are so easy    ",
}

export {mailOptions,transporter};