import mailConfig from '@config/email';
import Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';
import { IProvider } from '@services/mail/providers/IProvider';

class MailTrapProvider implements IProvider {
    private transport: Mail;

    constructor() {
        this.transport = createTransport(mailConfig.mailtrap);
    }

    send(options: Mail.Options) {
        options.from = options.from || mailConfig.headers.from;

        return this.transport.sendMail(options);
    }
}

export default MailTrapProvider;
