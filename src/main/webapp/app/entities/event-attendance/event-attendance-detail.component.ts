import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { EventAttendance } from './event-attendance.model';
import { EventAttendanceService } from './event-attendance.service';

@Component({
    selector: 'jhi-event-attendance-detail',
    templateUrl: './event-attendance-detail.component.html'
})
export class EventAttendanceDetailComponent implements OnInit, OnDestroy {

    eventAttendance: EventAttendance;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private eventAttendanceService: EventAttendanceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEventAttendances();
    }

    load(id) {
        this.eventAttendanceService.find(id).subscribe((eventAttendance) => {
            this.eventAttendance = eventAttendance;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEventAttendances() {
        this.eventSubscriber = this.eventManager.subscribe(
            'eventAttendanceListModification',
            (response) => this.load(this.eventAttendance.id)
        );
    }
}
