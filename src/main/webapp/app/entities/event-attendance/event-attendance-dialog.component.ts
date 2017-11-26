import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EventAttendance } from './event-attendance.model';
import { EventAttendancePopupService } from './event-attendance-popup.service';
import { EventAttendanceService } from './event-attendance.service';
import { Event, EventService } from '../event';
import { AppUser, AppUserService } from '../app-user';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-event-attendance-dialog',
    templateUrl: './event-attendance-dialog.component.html'
})
export class EventAttendanceDialogComponent implements OnInit {

    eventAttendance: EventAttendance;
    isSaving: boolean;

    events: Event[];

    users: AppUser[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eventAttendanceService: EventAttendanceService,
        private eventService: EventService,
        private appUserService: AppUserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.eventService.query()
            .subscribe((res: ResponseWrapper) => { this.events = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.appUserService
            .query({filter: 'eventattendance-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.eventAttendance.userId) {
                    this.users = res.json;
                } else {
                    this.appUserService
                        .find(this.eventAttendance.userId)
                        .subscribe((subRes: AppUser) => {
                            this.users = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.eventAttendance.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eventAttendanceService.update(this.eventAttendance));
        } else {
            this.subscribeToSaveResponse(
                this.eventAttendanceService.create(this.eventAttendance));
        }
    }

    private subscribeToSaveResponse(result: Observable<EventAttendance>) {
        result.subscribe((res: EventAttendance) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EventAttendance) {
        this.eventManager.broadcast({ name: 'eventAttendanceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEventById(index: number, item: Event) {
        return item.id;
    }

    trackAppUserById(index: number, item: AppUser) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-event-attendance-popup',
    template: ''
})
export class EventAttendancePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventAttendancePopupService: EventAttendancePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eventAttendancePopupService
                    .open(EventAttendanceDialogComponent as Component, params['id']);
            } else {
                this.eventAttendancePopupService
                    .open(EventAttendanceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
