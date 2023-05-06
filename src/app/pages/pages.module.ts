import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

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
