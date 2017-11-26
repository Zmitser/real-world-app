import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { AppUser } from './app-user.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AppUserService {

    private resourceUrl = SERVER_API_URL + 'api/app-users';

    constructor(private http: Http) { }

    create(appUser: AppUser): Observable<AppUser> {
        const copy = this.convert(appUser);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(appUser: AppUser): Observable<AppUser> {
        const copy = this.convert(appUser);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<AppUser> {
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
     * Convert a returned JSON object to AppUser.
     */
    private convertItemFromServer(json: any): AppUser {
        const entity: AppUser = Object.assign(new AppUser(), json);
        return entity;
    }

    /**
     * Convert a AppUser to a JSON which can be sent to the server.
     */
    private convert(appUser: AppUser): AppUser {
        const copy: AppUser = Object.assign({}, appUser);
        return copy;
    }
}
