import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { APIService } from './service/api.servies.mock';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CredentialsService } from './service/credentials.service';
import { AddExpencesComponent } from './modal/add-expences/add-expences.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddExpencesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule ,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [APIService, CredentialsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
