import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { APIService } from 'src/app/service/api.servies.mock';
import { CredentialsService } from 'src/app/service/credentials.service';

@Component({
  selector: 'app-add-expences',
  templateUrl: './add-expences.component.html',
  styleUrls: ['./add-expences.component.scss']
})
export class AddExpencesComponent implements OnInit {
  
  form: FormGroup;
  constructor(
    private router:Router,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private apiService: APIService,
    private CredentialsService : CredentialsService,
  ) {
    this.formInit()
  }

  ngAfterContentInit() {}
  ngOnInit(): void {}

  formInit(){
    this.form = this.formBuilder.group(
      {
          id: [undefined, [Validators.required]],
          date: [new Date(), [Validators.required]],
          
          category: [undefined, [Validators.required]],
          vendor: [undefined, [Validators.required]],
          amount: [undefined, [Validators.required]],
          modeOfPayment: [undefined, [Validators.required]],
          paymentType: [undefined, [Validators.required]],
          diffrenceAmount: [],
          paymentId: [undefined, [Validators.required]],
          userId: [undefined, [Validators.required]],
          operation: [undefined, [Validators.required]],
          operator: [undefined, [Validators.required]],
      },
    );
  }
}
