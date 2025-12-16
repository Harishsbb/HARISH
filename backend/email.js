const nodemailer = require('nodemailer');

const sendEmail = async ({ name, email, message }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"${name}" <${email}>`, // sender address
            to: 'bavaharishkumar@gmail.com', // list of receivers
            subject: "Portfolio Contact Form Message", // Subject line
            text: message, // plain text body
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `, // html body
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        console.error("Transporter config:", {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            user: process.env.SMTP_USER ? 'Set' : 'Not Set',
            pass: process.env.SMTP_PASS ? 'Set' : 'Not Set'
        });
        throw error;
    }
};

module.exports = sendEmail;
