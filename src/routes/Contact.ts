import {ContactController} from '../controllers/ContactController';
import {Route} from '../lib/framework/routing/Route';

export class Contact extends Route {
    public contactController: ContactController = new ContactController();

    constructor() {
        super();

        this.router.get('/sample', (req, res, next) => {
            res.json({
                data: 'test',
                message: 'Hello from express router'
            });
        });

        this.router.group({
            prefix: 'group',
            middleware: ['auth:admin', 'session']
        }, r => {
            r.get('sample', (req, res, next) => {
                res.respond({
                    foo: 'Standard data from API',
                }, `Standard message from API`, 201 );
            });
        });

        this.router.group({
            prefix: 'contact'
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
