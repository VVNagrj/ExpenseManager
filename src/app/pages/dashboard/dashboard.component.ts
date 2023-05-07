import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { APIService } from 'src/app/service/api.servies.mock';
import { CredentialsService } from 'src/app/service/credentials.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userDetails: any;
  bankDetails: any;
  cashInHand:any;

  constructor(
    private apiService: APIService,
    private router:Router,
    private CredentialsService : CredentialsService,
  ) {
      this.userDetails = this.CredentialsService.credentials
      this.getBankDetails()
      this.getCashInHand()
  }

  ngOnInit(): void {}

  getBankDetails(){
    let filter : any = { where: {userId:this.userDetails.userId}}
    this.apiService.getBankDetails(filter).subscribe(bankDetails =>{
      this.bankDetails = bankDetails
    })
  }

  getCashInHand(){
    let filter : any = { where: {userId:this.userDetails.userId}}
    this.apiService.getCashInHand(filter).subscribe(cashInHand =>{
      this.cashInHand = cashInHand
    })
  }

}
