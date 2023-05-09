import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
    private modalService: NgbModal,
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

  confirmationModel:any
  openUserAssignmentModal(confirmation: any) {

    this.confirmationModel ={
      heading:'heading',
      message:'message',
      sucessbtn:'sucessbtn',
      closebtn:'closebtn',
      close:'s'
    }

    const ref = this.modalService.open(confirmation, {
      centered: true,
      backdrop: 'static',
      modalDialogClass: 'modal-sml',
      keyboard: false,
      size: 'md',
    });
    ref.result.then(
      (result) => {},
      (reason) => {}
    );
   }

}
