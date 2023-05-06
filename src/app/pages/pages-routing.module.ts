import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BorrowerComponent } from './components/borrower/borrower.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [

  {
    path:'',
    component:PagesComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'borrower/:id',
        component:BorrowerComponent
      }
    ]

  }


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
