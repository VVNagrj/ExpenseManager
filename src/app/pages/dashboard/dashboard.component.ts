import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { count } from 'rxjs';
import { AddExpencesComponent } from 'src/app/modal/add-expences/add-expences.component';
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
  linkedAccountBefore:any[] = [];
  linkedAccountAfter:any[] = [];

  constructor(
    private apiService: APIService,
    private router:Router,
    private CredentialsService : CredentialsService,
    private modalService: NgbModal,
  ) {
      this.userDetails = this.CredentialsService.credentials
  }

  ngOnInit(): void {}
  
  ngAfterContentInit() {
    this.loadDashboard()
  }
  loadDashboard(){
    this.linkedAccountBefore = [];
    this.linkedAccountAfter = [];
    this.getBankDetails()
    this.getCashInHand()
  }

  getBankDetails(){
    let filter : any = { where: {userId:this.CredentialsService.userId}}
    this.apiService.getBankDetails(filter).subscribe(bankDetails =>{
      this.bankDetails = bankDetails
      this.bankDetails.forEach((bank: any) => {
        this.linkedAccountBefore.push( { type : 'Bank Transfer', id: bank.id, BankName:bank.bankName, Balance:bank.accountBalance })
        this.linkedAccountAfter.push( { type : 'Bank Transfer', id: bank.id, BankName:bank.bankName, Balance:bank.accountBalance })
      })
    })
  }

  getCashInHand(){
    let filter : any = { where: {userId:this.CredentialsService.userId}}
    this.apiService.getCashInHand(filter).subscribe(cashInHand =>{
      this.cashInHand = cashInHand
      this.cashInHand.forEach((cash: any) => {
        this.linkedAccountBefore.push( { type : 'Cash', id:  cash.id, Balance: cash.amountInHand }) 
        this.linkedAccountAfter.push( { type : 'Cash', id:  cash.id, Balance: cash.amountInHand }) 
      })
    })
  }

  AddExpences() {
    
    const ref = this.modalService.open(AddExpencesComponent, {
      centered: true,
      backdrop: 'static',
      modalDialogClass: 'modal-sml',
      keyboard: false,
      size: 'lg',
    });
    ref.componentInstance.operation = 'Expense';
    ref.componentInstance.operator = 'Sub';
    ref.result.then(
      (result) => {
        let diffamt :number[] = []
        diffamt.push(result.amount)
        result.diffrenceAmount = diffamt
        this.transaction(result)

      },
      (reason) => {}
    );
   }

   transaction(expences:any){
    
    let balanceamt: number = 0 
    this.linkedAccountAfter.filter(data => {
      
      if((data.type == expences.paymentType) && (data.id == expences.paymentId)){

          if(expences.operator == 'Sub'){
            balanceamt = data.Balance - expences.amount
          } else if(expences.operator == 'Add'){
            balanceamt = data.Balance + expences.amount
          }
          data.Balance = balanceamt
      }    
    })

    this.InsertTrans(expences,balanceamt)
   }
   InsertTrans(expences: any,balanceamt : number){

    let id : number = 0
    this.apiService.gettransactionsCount().subscribe( e =>{
      id = e.count + 1
      let data = {
        id: id,
        userId: this.CredentialsService.userId,
        operation: expences.operation,
        operator: expences.operator,
        amount: expences.amount,
        paymentType: expences.paymentType,
        paymentMode: expences.modeOfPayment,
        paymentId: expences.paymentId,

        linkedAccountBefore: this.linkedAccountBefore,
        linkedAccountAfter: this.linkedAccountAfter,
        expenseId: null      
      } 

      this.apiService.inserexpenses(expences).subscribe(expences => {
        data.expenseId = expences.id
        this.apiService.insertransactions(data).subscribe(transactions =>{

          if (expences.paymentType == 'Cash') {

            let data1 = {
              id: expences.paymentId,
              userId: this.CredentialsService.userId,
              amountInHand: balanceamt,
            }
            this.apiService.updateCashInHand(data1, expences.paymentId).subscribe(cashInHand => {
              this.loadDashboard()
            })
          } else if (expences.paymentType == 'Bank Transfer') {

            let where1 = { id: expences.paymentId }
            let data1 = { accountBalance: balanceamt }
            this.apiService.updateBankDetails(data1, where1).subscribe(cashInHand => {
              this.loadDashboard()
            })
          } 

        })
      })
  })

    
   }

}
