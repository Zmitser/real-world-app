import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AppUser } from './app-user.model';
import { AppUserPopupService } from './app-user-popup.service';
import { AppUserService } from './app-user.service';
import { Location, LocationService } from '../location';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-app-user-dialog',
    templateUrl: './app-user-dialog.component.html'
})
export class AppUserDialogComponent implements OnInit {

    appUser: AppUser;
    isSaving: boolean;

    homelocations: Location[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private appUserService: AppUserService,
        private locationService: LocationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.locationService
            .query({filter: 'appuser-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.appUser.homeLocationId) {
                    this.homelocations = res.json;
                } else {
                    this.locationService
                        .find(this.appUser.homeLocationId)
                        .subscribe((subRes: Location) => {
                            this.homelocations = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.appUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.appUserService.update(this.appUser));
        } else {
            this.subscribeToSaveResponse(
                this.appUserService.create(this.appUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<AppUser>) {
        result.subscribe((res: AppUser) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AppUser) {
        this.eventManager.broadcast({ name: 'appUserListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-app-user-popup',
    template: ''
})
export class AppUserPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private appUserPopupService: AppUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.appUserPopupService
                    .open(AppUserDialogComponent as Component, params['id']);
            } else {
                this.appUserPopupService
                    .open(AppUserDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
