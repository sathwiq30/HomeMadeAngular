import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { OrdersComponent } from './orders/orders.component';
import { MenuComponent } from './menu/menu.component';
import { ItemsComponent } from './menu/items/items.component';
import { MenusComponent } from './vendor/menus/menus.component';
import { ItemComponent } from './vendor/menus/item/item.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './vendor/order/order.component';
import { AllordersComponent } from './vendor/orders/allorders/allorders.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { HomeComponent } from './home/home.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['']);
const routes: Routes = [
  { path : '' ,component: HomeComponent},
  { path : 'menu/:id' , component : MenuComponent ,
    children: [
      {path: 'items/:id', component: ItemsComponent}
    ]
  },
  { path : 'vendor/menu' , component :  MenusComponent,
    children: [
      {path: 'item/:id', component: ItemComponent , canActivate : [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }}
    ],  canActivate : [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  { path : 'vendor/orders' , component : OrderComponent},
  { path : 'vendor/allorders' , component : AllordersComponent},
  { path : 'cart' , component : CartComponent , canActivate : [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path : 'orders' , component : OrdersComponent, canActivate : [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path : 'login', component: LoginComponent , canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }},
  {path : 'login/:id', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }},
  { path : 'signup', component : SignupComponent},
  { path : 'signup/:id', component : SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
