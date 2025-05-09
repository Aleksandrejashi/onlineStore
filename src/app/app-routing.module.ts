import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ItemDetailComponent } from './pages/item-detail/item-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }, 
  { path: 'register', component: RegistrationComponent },   
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }