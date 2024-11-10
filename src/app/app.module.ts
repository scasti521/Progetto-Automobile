import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AutoListComponent } from './component/auto-list/auto-list.component';
import { LoginComponent } from './component/login/login.component';
import { AddAutoComponent } from './component/add-auto/add-auto.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { AutoItemsComponent } from './component/auto-items/auto-items.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AutoListComponent,
    LoginComponent,
    AddAutoComponent,
    AutoItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    HttpClientModule,
    NgForOf
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
