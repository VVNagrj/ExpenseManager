import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { APIService } from 'src/app/service/api.servies.mock';
import { CredentialsService } from 'src/app/service/credentials.service';

@Component({
  selector: 'app-self-transfer',
  templateUrl: './self-transfer.component.html',
  styleUrls: ['./self-transfer.component.scss']
})
export class SelfTransferComponent implements OnInit {
  
  form: FormGroup;
  transactionsId:number

  paymentType: any = ['Cash','Bank Transfer'];
  bankDetails: any = []
  cashInHand:any
  operation:string

  constructor(
    private router:Router,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private apiService: APIService,
    private CredentialsService : CredentialsService,
  ) {}

  ngAfterContentInit() {
    setTimeout(() => { this.formInit() }, 2000);
  }
  ngOnInit(): void {}

  formInit(){
    this.form = this.formBuilder.group(
      {
          date: [new Date(), [Validators.required]],
          userId: [this.CredentialsService.userId, [Validators.required]],
          operation: [this.operation, [Validators.required]],

          expenses: [undefined, [Validators.required]],
          category: [undefined, [Validators.required]],
          vendor: [undefined, [Validators.required]],
          amount: [undefined, [Validators.required]],
          modeOfPayment: [undefined, [Validators.required]],
          paymentType: ['', [Validators.required]],
          diffrenceAmount: [],
          paymentId: [undefined, [Validators.required]],

      },
    );
  }
}
