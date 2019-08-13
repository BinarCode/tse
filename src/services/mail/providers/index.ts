import { IProvider } from './IProvider';
import MailTrapProvider from './MailTrapProvider';

const PROVIDERS = {
    mailtrap: {
        name: 'mailtrap',
        handler: MailTrapProvider,
    },
};

export { PROVIDERS, MailTrapProvider, IProvider };
