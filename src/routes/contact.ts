import {Request, Response} from 'express';
import { ContactController } from '../controllers/ContactController';

export class Contact {
    public contactController: ContactController = new ContactController();
    public init(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                console.log('request /');
            });

        app.route('/contact')
            .get(this.contactController.getContacts)
            .post(this.contactController.store);

        app.route('/contact/:contactId')
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact);
    }
}
