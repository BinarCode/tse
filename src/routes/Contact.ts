import {ContactController} from '../controllers/ContactController';
import {Route, IRoute} from '../lib/framework/routing/Route';

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
            middleware: ['auth:admin,user', 'session']
        }, r => {
            r.get('sample', (req, res, next) => {
                res.json({
                    data: 'test',
                    message: 'Hello from group router'
                });
            });
        });

        this.router.group({
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
