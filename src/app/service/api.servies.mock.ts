import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class APIService {

    constructor(private http: HttpClient) {}

    //Users
    getUsers(filter:any): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/users?filters=` + JSON.stringify(filter));
    }
    getUsersCount(filter:any): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/users/count?filters=` + JSON.stringify(filter));
    }

    //Bank
    getBankDetails(filter:any): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/bank-details?filters=` + JSON.stringify(filter));
    }

    //CIH
    getCashInHand(filter:any): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/cash-in-hands?filters=` + JSON.stringify(filter));
    }


}
