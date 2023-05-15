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
        return this.http.get<any>(`${environment.serverUrl}/users/count`);
    }

    //Bank
    getBankDetails(filter:any): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/bank-details?filters=` + JSON.stringify(filter));
    }

    //CIH
    getCashInHand(filter:any): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/cash-in-hands?filters=` + JSON.stringify(filter));
    }

    //Expenses
    getExpensesCount(filter?:any): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/expenses/count`);
    }

    //Transactions
    gettransactionsCount(filter?:any): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/transactions/count`);
    }

    insertransactions(data: any): Observable<any> {
        return this.http.post<any>(`${environment.serverUrl}/transactions`,data);
    }

    inserexpenses(data: any): Observable<any> {
        return this.http.post<any>(`${environment.serverUrl}/expenses`,data);
    }



}
