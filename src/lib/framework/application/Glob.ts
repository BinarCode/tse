import {Exception} from '../../Facades';
export class Glob {
    constructor() {
        this.set();
    }

    public set() {
        global['Exception'] = Exception;
    }
}
