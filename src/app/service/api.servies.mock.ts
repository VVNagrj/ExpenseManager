import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class APIService {

    constructor(private http: HttpClient) {}
    
    //Borrower
    getAllBorrowers(): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/borrowers`);
    }

    getBorrowersById(id:string): Observable<any> {
        return this.http.get<any>(`${environment.serverUrl}/borrowers/${id}`);
    }

    //Collateral
    getCollateral(filter:any): Observable<any> {
        const url = `${environment.serverUrl}/collaterals?filter=`+ JSON.stringify(filter) 
        return this.http.get<any>(url);
    }

    //Loan
    getLoan(filter:any): Observable<any> {
        const url = `${environment.serverUrl}/loans?filter=`+ JSON.stringify(filter) 
        return this.http.get<any>(url);
    }


}
