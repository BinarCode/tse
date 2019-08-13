import MailTemplate from './MailTemplate';
import { ProviderNotFoundException } from '@exceptions/index';
import { PROVIDERS, IProvider } from '@services/mail/providers';

export interface SendWithParamsOptions {
    template: string;
    data: {};
    options: {
        subject: string;
        to: string;
        cc?: string;
        bcc?: string;
        from?: string;
        plain?: string;
    };
}

/**
 * @desc Generic Email Connector service
 * @class MailService
 */

class MailService {
    private variables = {};
    private mailTemplate: MailTemplate;
    private provider: IProvider;
    private emailTemplate: string;
    private emailSubject: string;
    private copyTo: string;
    private recipient: string;
    private hiddenCopyTo: string;
    private sender: string;
    private plainEmail: string;
    private renderedEmail: string;

    constructor(provider = process.env.MAIL_PROVIDER) {
        this.variables = {};
        this.mailTemplate = new MailTemplate();

        this.connect(provider);
    }

    connect(emailProvider = PROVIDERS.mailtrap.name) {
        this.provider = this.getProvider(emailProvider);

        return this;
    }

    getProvider(emailProvider) {
        if (PROVIDERS[emailProvider] && PROVIDERS[emailProvider].handler) {
            return new PROVIDERS[emailProvider].handler();
        }

        throw new ProviderNotFoundException(
            `Provider ${emailProvider} not found.`
        );
    }

    template(template) {
        this.emailTemplate = template;

        return this;
    }

    subject(subject) {
        this.emailSubject = subject;

        return this;
    }

    cc(cc) {
        this.copyTo = cc;

        return this;
    }

    data(data) {
        this.variables = data;

        return this;
    }

    to(to) {
        this.recipient = to;

        return this;
    }

    bcc(bcc) {
        this.hiddenCopyTo = bcc;

        return this;
    }

    from(from) {
        this.sender = from;

        return this;
    }

    plain(plain) {
        this.plainEmail = plain;

        return this;
    }

    async render() {
        this.renderedEmail = await this.mailTemplate.renderMail(
            this.emailTemplate,
            this.variables
        );

        return this;
    }

    async send() {
        if (!this.renderedEmail) {
            await this.render();
        }
        return await this.provider.send({
            html: this.renderedEmail,
            subject: this.emailSubject,
            to: this.recipient,
            cc: this.copyTo,
            bcc: this.hiddenCopyTo,
            from: this.sender,
            plain: this.plainEmail,
        });
    }

    async sendWithParams({
        template,
        data,
        options: { subject, to, cc, bcc, from, plain },
    }: SendWithParamsOptions) {
        const mailBody = await this.mailTemplate.renderMail(template, data);

        return await this.provider.send({
            html: mailBody,
            subject,
            to,
            cc,
            bcc,
            from,
            plain,
        });
    }
}

export default MailService;
