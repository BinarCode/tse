import BPromise from 'bluebird';
import fs from 'fs';
import mjml2html from 'mjml';
import moment from 'moment';
import path from 'path';
import pug from 'pug';

class MailTemplate {
    cachedStyles: string;
    stylePath = path.join(__dirname, '../../../views/assets/app.css');

    constructor() {}

    getStyles() {
        return new BPromise((resolve, reject) => {
            if (this.cachedStyles) {
                return resolve(this.cachedStyles);
            }

            fs.readFile(this.stylePath, 'utf-8', (err, style) => {
                if (err) {
                    return reject(err);
                }

                this.cachedStyles = style;

                resolve(style);
            });
        });
    }

    loadTemplate(templateName) {
        const templatePath = path.join(
            __dirname,
            '../../../views/emails/',
            templateName + '.pug'
        );
        const template = pug.compileFile(templatePath);

        return template;
    }

    async renderMail(templateName, data) {
        const compiledTemplate = this.loadTemplate(templateName);
        const styles = await this.getStyles();
        const renderedMail = compiledTemplate({
            data,
            styles,
            moment,
            appUrl: process.env.APP_URL,
        });

        const transformedMJML = mjml2html(renderedMail);

        return transformedMJML.html;
    }
}

export default MailTemplate;
