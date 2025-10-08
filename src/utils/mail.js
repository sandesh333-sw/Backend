import Mailgen from "mailgen";

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
                    link: verificationUrl
                },
            },
            outro: "Need help, Reply to this email, we'd love to help! "
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
                    link: resetUrl
                },
            },
            outro: "Need help, Reply to this email, we'd love to help! "
        },
    };
};


export {
    emailVerificationContent,
    forgotPasswordContent
}