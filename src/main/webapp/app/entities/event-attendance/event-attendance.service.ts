import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EventAttendance } from './event-attendance.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EventAttendanceService {

    private resourceUrl = SERVER_API_URL + 'api/event-attendances';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(eventAttendance: EventAttendance): Observable<EventAttendance> {
        const copy = this.convert(eventAttendance);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(eventAttendance: EventAttendance): Observable<EventAttendance> {
        const copy = this.convert(eventAttendance);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EventAttendance> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to EventAttendance.
     */
    private convertItemFromServer(json: any): EventAttendance {
        const entity: EventAttendance = Object.assign(new EventAttendance(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
    }

    /**
     * Convert a EventAttendance to a JSON which can be sent to the server.
     */
    private convert(eventAttendance: EventAttendance): EventAttendance {
        const copy: EventAttendance = Object.assign({}, eventAttendance);
        copy.date = this.dateUtils
            .convertLocalDateToServer(eventAttendance.date);
        return copy;
    }
}
