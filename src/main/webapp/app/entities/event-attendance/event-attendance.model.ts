import { BaseEntity } from './../../shared';

export class EventAttendance implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public eventId?: number,
        public userId?: number,
    ) {
    }
}
