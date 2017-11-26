import { BaseEntity } from './../../shared';

export class Event implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public code?: string,
        public locationId?: number,
        public eventAttendances?: BaseEntity[],
    ) {
    }
}
