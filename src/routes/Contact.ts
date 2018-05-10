import { ContactController } from '../controllers/ContactController';
import { BaseRoute } from './BaseRoute';
import { IRoute } from './IRoute';

export class Contact extends BaseRoute implements IRoute {
    public contactController: ContactController = new ContactController();
    constructor() {
        super();
        this.init();
    }

    public init(): void {
        this.Route.get('/sample', (req, res, next) => {
            res.json({
                'data': 'test'
            });
        });

        this.Route.group({
            prefix: 'contact',
            middleware: 'auth'
        }, (router) => {
            router.post('', this.contactController.store);
            router.get(':contactId', this.contactController.getContactWithID);
            router.get('', this.contactController.getContacts);
            router.post('', this.contactController.store);
            router.put(':contactId', this.contactController.updateContact);
            router.delete(':contactId', this.contactController.deleteContact);
        });
    }
}
