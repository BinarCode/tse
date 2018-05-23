import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import {Weapon} from './definitions/Weapon';
import {Warrior} from './definitions/Warrior';

@injectable()
export class Ninja implements Warrior{
    private _katana: Weapon;
    public constructor(
        @inject('IWeapon') katana: Weapon,
    ) {
        this._katana = katana;
    }

    public fight() {
        return this._katana.hit();
    }

}
