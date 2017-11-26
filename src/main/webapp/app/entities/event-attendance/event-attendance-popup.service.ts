import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventAttendance } from './event-attendance.model';
import { EventAttendanceService } from './event-attendance.service';

@Injectable()
export class EventAttendancePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private eventAttendanceService: EventAttendanceService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.eventAttendanceService.find(id).subscribe((eventAttendance) => {
                    if (eventAttendance.date) {
                        eventAttendance.date = {
                            year: eventAttendance.date.getFullYear(),
                            month: eventAttendance.date.getMonth() + 1,
                            day: eventAttendance.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.eventAttendanceModalRef(component, eventAttendance);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.eventAttendanceModalRef(component, new EventAttendance());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    eventAttendanceModalRef(component: Component, eventAttendance: EventAttendance): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.eventAttendance = eventAttendance;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
