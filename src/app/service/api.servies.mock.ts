import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class APIService {

    constructor(private http: HttpClient) {}
    
    getUsers(filter:any): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/users?filters=` + JSON.stringify(filter));
    }
    getUsersCount(filter:any): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/users/count?filters=` + JSON.stringify(filter));
    }


}
