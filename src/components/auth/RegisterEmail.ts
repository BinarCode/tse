import { t } from 'i18next';
import { UserModel } from '@components/users';
import MailService from '@services/mail/MailService';
import { MailableInterface } from '@interfaces/index';
import { UserVerifyModel } from '@components/usersVerify';

class resetPasswordEmail extends MailService implements MailableInterface {
    private user: UserModel;
    private verification: UserVerifyModel;

    constructor(user: UserModel, verification: UserVerifyModel) {
        super();
        this.user = user;
        this.verification = verification;
    }

    build(to) {
        return this.to(to)
            .template('registered.email')
            .subject(t('Activate registered account'))
            .data({
                fullName: this.user.fullName,
                token: this.verification.token,
            });
    }
}

export default resetPasswordEmail;
