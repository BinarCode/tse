import 'reflect-metadata';
import {injectable} from 'inversify'
import {Weapon} from './definitions/Weapon';

@injectable()
export class Katana implements Weapon {
    public hit() {
        return "cut!";
    }
}
