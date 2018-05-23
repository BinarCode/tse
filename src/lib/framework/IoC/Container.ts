import {  Container as InvesifyContainer } from "inversify";
export class Container {
    protected container: InvesifyContainer;
    constructor() {
        this.container = new InvesifyContainer();
        this.boot();
    }

    protected boot() {}

}
