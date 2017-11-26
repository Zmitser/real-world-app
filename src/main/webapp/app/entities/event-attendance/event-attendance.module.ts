import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterrwaSharedModule } from '../../shared';
import {
    EventAttendanceService,
    EventAttendancePopupService,
    EventAttendanceComponent,
    EventAttendanceDetailComponent,
    EventAttendanceDialogComponent,
    EventAttendancePopupComponent,
    EventAttendanceDeletePopupComponent,
    EventAttendanceDeleteDialogComponent,
    eventAttendanceRoute,
    eventAttendancePopupRoute,
} from './';

const ENTITY_STATES = [
    ...eventAttendanceRoute,
    ...eventAttendancePopupRoute,
];

@NgModule({
    imports: [
        JhipsterrwaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EventAttendanceComponent,
        EventAttendanceDetailComponent,
        EventAttendanceDialogComponent,
        EventAttendanceDeleteDialogComponent,
        EventAttendancePopupComponent,
        EventAttendanceDeletePopupComponent,
    ],
    entryComponents: [
        EventAttendanceComponent,
        EventAttendanceDialogComponent,
        EventAttendancePopupComponent,
        EventAttendanceDeleteDialogComponent,
        EventAttendanceDeletePopupComponent,
    ],
    providers: [
        EventAttendanceService,
        EventAttendancePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterrwaEventAttendanceModule {}
