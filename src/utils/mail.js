import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanager.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_TRAP_HOST,
    port: process.env.MAIL_TRAP_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS,
    },
  });

  const mail = {
    from: "mail.@.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error("Email service failed", error);
  }
};

const emailVerificationContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our app",
      action: {
        instructions: "To verify your email, please click following button",
        button: {
          color: "#22BC66",
          text: "Verify Email",
          link: verificationUrl,
        },
      },
      outro: "Need help, Reply to this email, we'd love to help! ",
    },
  };
};

const forgotPasswordContent = (username, resetUrl) => {
  return {
    body: {
      name: username,
      intro: "Reset your password",
      action: {
        instructions: "To reset password, please click following button",
        button: {
          color: "#e3787aff",
          text: "Reset Password",
          link: resetUrl,
        },
      },
      outro: "Need help, Reply to this email, we'd love to help! ",
    },
  };
};

export { emailVerificationContent, forgotPasswordContent, sendEmail };
