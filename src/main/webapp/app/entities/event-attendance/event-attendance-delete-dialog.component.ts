import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EventAttendance } from './event-attendance.model';
import { EventAttendancePopupService } from './event-attendance-popup.service';
import { EventAttendanceService } from './event-attendance.service';

@Component({
    selector: 'jhi-event-attendance-delete-dialog',
    templateUrl: './event-attendance-delete-dialog.component.html'
})
export class EventAttendanceDeleteDialogComponent {

    eventAttendance: EventAttendance;

    constructor(
        private eventAttendanceService: EventAttendanceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.eventAttendanceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'eventAttendanceListModification',
                content: 'Deleted an eventAttendance'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-event-attendance-delete-popup',
    template: ''
})
export class EventAttendanceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventAttendancePopupService: EventAttendancePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.eventAttendancePopupService
                .open(EventAttendanceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
