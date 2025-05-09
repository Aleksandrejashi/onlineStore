import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ItemDetailComponent } from './pages/item-detail/item-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartService } from './services/cart.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { FilterComponent } from './filter/filter.component';
import { CommonModule } from '@angular/common';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    ItemDetailComponent,
    
    

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
  // schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [CartService],  
  bootstrap: [AppComponent]
})
export class AppModule { }
