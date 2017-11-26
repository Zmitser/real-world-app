/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { JhipsterrwaTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EventAttendanceDetailComponent } from '../../../../../../main/webapp/app/entities/event-attendance/event-attendance-detail.component';
import { EventAttendanceService } from '../../../../../../main/webapp/app/entities/event-attendance/event-attendance.service';
import { EventAttendance } from '../../../../../../main/webapp/app/entities/event-attendance/event-attendance.model';

describe('Component Tests', () => {

    describe('EventAttendance Management Detail Component', () => {
        let comp: EventAttendanceDetailComponent;
        let fixture: ComponentFixture<EventAttendanceDetailComponent>;
        let service: EventAttendanceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterrwaTestModule],
                declarations: [EventAttendanceDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EventAttendanceService,
                    JhiEventManager
                ]
            }).overrideTemplate(EventAttendanceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventAttendanceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventAttendanceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new EventAttendance(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.eventAttendance).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
