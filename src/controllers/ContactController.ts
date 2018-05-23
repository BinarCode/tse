import * as mongoose from 'mongoose';
import {Request, Response} from 'express-serve-static-core'
import { ContactSchema } from '../models/ContactSchema';
import { Controller } from './Controller';
const Contact = mongoose.model('Contact', ContactSchema);
export class ContactController extends Controller {
    public getContacts (req: Request, res: Response) {
        Contact.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public store(req: Request, res: Response) {
        Contact.create(req.body, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getContactWithID (req: Request, res: Response) {
        Contact.findById(req.params.contactId, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public updateContact (req: Request, res: Response) {
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public deleteContact (req: Request, res: Response) {
        Contact.remove({ _id: req.params.contactId }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!'});
        });
    }
}

export default new ContactController();
