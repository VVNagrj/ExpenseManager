import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { APIService } from 'src/app/service/api.servies.mock';
import { CredentialsService } from 'src/app/service/credentials.service';

@Component({
  selector: 'app-self-transfer',
  templateUrl: './self-transfer.component.html',
  styleUrls: ['./self-transfer.component.scss'],
})
export class SelfTransferComponent implements OnInit {
  form: FormGroup;

  paymentType: any = ['Cash', 'Bank Transfer'];
  bankDetails: any = [];
  cashInHand: any;
  operation: string;

  transferFrom: any[] = [];
  transferTo: any[] = [];

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private apiService: APIService,
    private CredentialsService: CredentialsService
  ) {}

  ngAfterContentInit() {
    this.loadAccDetails();
    setTimeout(() => {
      this.formInit();
    }, 2000);
  }
  ngOnInit(): void {}

  formInit() {
    this.form = this.formBuilder.group({
      date: [new Date(), [Validators.required]],
      userId: [this.CredentialsService.userId, [Validators.required]],
      operation: [this.operation, [Validators.required]],

      amount: [undefined, [Validators.required]],
      diffrenceAmount: [],
      paymentIdFrom: ['', [Validators.required]],
      paymentIdTo: ['', [Validators.required]],
    });
    this.form.get('paymentIdFrom')?.valueChanges.subscribe((value) => {
      let list = this.transferFrom?.filter((data) => data.id !== value.id);
      this.transferTo = list;
      this.form.get('paymentIdTo')?.setValue('');
    });
  }

  loadAccDetails() {
    let listOfAcc: any[] = [];
    listOfAcc.push({
      id: this.bankDetails?.length + 1,
      Name: 'Cash',
      paymentId: this.cashInHand.id,
      Type: 'Cash',
      amountInHand : this.cashInHand.amountInHand
    });
    this.bankDetails.forEach((bank: any, index: number) => {
      listOfAcc.push({
        id: index + 1,
        Name: bank.bankName,
        paymentId: bank.id,
        Type: 'Bank Transfer',
        accountBalance: bank.accountBalance
      });
    });
    this.transferFrom = listOfAcc;
    this.transferTo = listOfAcc;
  }
}
