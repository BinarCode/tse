import MailService from '@services/mail/MailService';
import { PROVIDERS } from '@services/mail/providers';

const sendTestEmail = async () => {
    const mailService = new MailService();
    const resultChunks = await mailService
        .connect(PROVIDERS.mailtrap.name)
        .to('john_doe@email.com')
        .template('registered.email')
        .subject('Welcome to starter')
        .data({ userName: 'John Doe' })
        .send();

    const result = await mailService.sendWithParams({
        template: 'registered.email',
        data: {
            userName: 'John Doe',
        },
        options: {
            to: 'john_doe@email.com',
            subject: 'Welcome to starter | With Params',
        },
    });
};

export default sendTestEmail;
