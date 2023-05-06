import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { APIService } from 'src/app/service/api.servies.mock';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  timeout: any = null;
  tasks1$: Observable<any[]>;
  totalTask$: Observable<number>;


  constructor(
    private apiService: APIService,
    private router:Router,
  ) {}

  ngOnInit(): void {}

}
