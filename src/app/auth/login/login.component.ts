import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/service/api.servies.mock';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private apiService: APIService,
  ) {
    this.formInit()
   }

  ngOnInit(): void {}

  onLogin(){

    let filter : any = { where: {email:this.form.get('email')?.value ,password: this.form.get('password')?.value}}

    this.apiService.getUsers(filter).subscribe(
      users => {
        if(users.length == 1){
          this.router.navigate(['/expman/dashboard']);
        } else {
          console.log('error')
        }
      }
    );    
  }

  formInit(){
    this.form = this.formBuilder.group(
      {
        email: [undefined, [Validators.required]],
        password: [undefined, [Validators.required]],
      },
    );
  }

}
