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


}
