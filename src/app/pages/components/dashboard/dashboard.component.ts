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

  constructor(
    private apiService: APIService,
    private router:Router,
    private CredentialsService : CredentialsService,
  ) {
      this.userDetails = this.CredentialsService.credentials      
  }

  ngOnInit(): void {}

}
