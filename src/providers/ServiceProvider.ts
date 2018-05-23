import {Weapon} from '../services/definitions/Weapon';
import {Warrior} from '../services/definitions/Warrior';
import {Katana} from '../services/Katana';
import {Ninja} from '../services/Ninja';
import {Container} from '../lib/Facades';

export class ServiceProvider extends Container{
    protected provider;

    constructor() {
        super();
    }

    protected boot() {
        this.container.bind<Weapon>('IWeapon').to(Katana);
        this.container.bind<Warrior>('Warrior').to(Ninja);
        const ninja = this.container.get<Warrior>('Warrior');
        console.log(ninja.fight(), 'message');
    }
}
