export default {
    mailtrap: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    },
    headers: {
        from: process.env.MAIL_FROM_ADDRESS,
    },
};
