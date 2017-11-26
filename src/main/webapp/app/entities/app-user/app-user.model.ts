import { BaseEntity } from './../../shared';

export class AppUser implements BaseEntity {
    constructor(
        public id?: number,
        public username?: string,
        public homeLocationId?: number,
    ) {
    }
}
