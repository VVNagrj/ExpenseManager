import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class APIService {

    constructor(private http: HttpClient) {}

    //Users
    getUsers(filter:any): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/users?filter=` + JSON.stringify(filter));
    }
    getUsersCount(filter:any): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/users/count`);
    }

    //Bank
    getBankDetails(filter:any): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/bank-details?filter=` + JSON.stringify(filter));
    }
    updateBankDetails(data: any,where: any): Observable<any> {
        return this.http.patch<any>(`${environment.serverUrl}/bank-details/?where=`+ JSON.stringify(where) ,data);
    }

    //CIH
    getCashInHand(filter:any): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/cash-in-hands?filter=` + JSON.stringify(filter));
    }
    updateCashInHand(data: any,id: number): Observable<any> {
        return this.http.put<any>(`${environment.serverUrl}/cash-in-hands/${id}`,data);
    }


    //Transactions
    gettransactionsCount(filter?:any): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/transactions/count`);
    }

    gettransactions(filter?:any): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/transactions?filter=` + JSON.stringify(filter));
    }

    insertransactions(data: any): Observable<any> {
        return this.http.post<any>(`${environment.serverUrl}/transactions`,data);
    }


}
