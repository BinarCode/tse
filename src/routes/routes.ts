import {Request, Response, Router} from 'express';
import { Contact } from './Contact';

export class Routes {
    public contactRoutes: Router = new Contact().getRoutes();
    public routes: Array<Router> = [];

    public getRoutes(): Array<Router> {
        this.routes.push(this.contactRoutes);
        return this.routes;
    }
}
