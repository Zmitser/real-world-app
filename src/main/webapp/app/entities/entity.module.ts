import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterrwaLocationModule } from './location/location.module';
import { JhipsterrwaEventModule } from './event/event.module';
import { JhipsterrwaEventAttendanceModule } from './event-attendance/event-attendance.module';
import { JhipsterrwaAppUserModule } from './app-user/app-user.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterrwaLocationModule,
        JhipsterrwaEventModule,
        JhipsterrwaEventAttendanceModule,
        JhipsterrwaAppUserModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterrwaEntityModule {}
