import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EventAttendanceComponent } from './event-attendance.component';
import { EventAttendanceDetailComponent } from './event-attendance-detail.component';
import { EventAttendancePopupComponent } from './event-attendance-dialog.component';
import { EventAttendanceDeletePopupComponent } from './event-attendance-delete-dialog.component';

export const eventAttendanceRoute: Routes = [
    {
        path: 'event-attendance',
        component: EventAttendanceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterrwaApp.eventAttendance.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'event-attendance/:id',
        component: EventAttendanceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterrwaApp.eventAttendance.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eventAttendancePopupRoute: Routes = [
    {
        path: 'event-attendance-new',
        component: EventAttendancePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterrwaApp.eventAttendance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'event-attendance/:id/edit',
        component: EventAttendancePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterrwaApp.eventAttendance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'event-attendance/:id/delete',
        component: EventAttendanceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterrwaApp.eventAttendance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
