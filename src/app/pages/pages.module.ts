import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent
  ],
  imports: [
   CommonModule,
   PagesRoutingModule,
  ],
  providers: [],
  bootstrap: [PagesComponent]
})
export class PagesModule { }
