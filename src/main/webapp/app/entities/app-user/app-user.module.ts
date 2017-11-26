import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterrwaSharedModule } from '../../shared';
import {
    AppUserService,
    AppUserPopupService,
    AppUserComponent,
    AppUserDetailComponent,
    AppUserDialogComponent,
    AppUserPopupComponent,
    AppUserDeletePopupComponent,
    AppUserDeleteDialogComponent,
    appUserRoute,
    appUserPopupRoute,
} from './';

const ENTITY_STATES = [
    ...appUserRoute,
    ...appUserPopupRoute,
];

@NgModule({
    imports: [
        JhipsterrwaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AppUserComponent,
        AppUserDetailComponent,
        AppUserDialogComponent,
        AppUserDeleteDialogComponent,
        AppUserPopupComponent,
        AppUserDeletePopupComponent,
    ],
    entryComponents: [
        AppUserComponent,
        AppUserDialogComponent,
        AppUserPopupComponent,
        AppUserDeleteDialogComponent,
        AppUserDeletePopupComponent,
    ],
    providers: [
        AppUserService,
        AppUserPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterrwaAppUserModule {}
