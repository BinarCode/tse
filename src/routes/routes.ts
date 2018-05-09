import {Request, Response} from 'express';
import { Contact } from './contact';

export class Routes {
    public contactRoutes: Contact = new Contact();
    public routes(app): void {
        this.contactRoutes.init(app);
    }
}
