import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CartService } from './services/cart.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { FilterComponent } from './filter/filter.component';
import { CartComponent } from './pages/cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
   
    // სხვა კომპონენტები standalone-ია, ამიტომ აქ არ წერენ
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HomeComponent,
    CartComponent,
    RegistrationComponent,
    FilterComponent
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
