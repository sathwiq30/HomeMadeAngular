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
import { RegisterComponent } from './vendor/auth/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { CmenusComponent } from './admin/cmenus/cmenus.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['']);
const adminOnly = () => hasCustomClaim('chef');
const chefOnly = () => hasCustomClaim('chef'  );
const routes: Routes = [
  { path : '' ,component: HomeComponent},
  { path : 'menu/:id' , component : MenuComponent ,
    children: [
      {path: 'items/:id', component: ItemsComponent}
    ]
  },
  { path : 'cart' , component : CartComponent , canActivate : [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path : 'orders' , component : OrdersComponent, canActivate : [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path : 'login', component: LoginComponent , canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }},
  {path : 'login/:id', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }},
  { path : 'signup', component : SignupComponent},
  { path : 'signup/:id', component : SignupComponent},
  { path : 'profile' , component : ProfileComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},

  // {path : 'vendor/login', component: LoginComponent  },
  // {path : 'login/:id', component: LoginComponent },
  { path : 'vendor/register', component : RegisterComponent},
  { path : 'vendor/register/:id', component : RegisterComponent},
  { path : 'vendor/menu' , component :  MenusComponent,
    children: [
      {path: 'item/:id', component: ItemComponent , canActivate : [AngularFireAuthGuard], data: { authGuardPipe: chefOnly }}
    ],  canActivate : [AngularFireAuthGuard], data: { authGuardPipe: chefOnly }
  },
  { path : 'vendor/orders' , component : OrderComponent , canActivate : [AngularFireAuthGuard], data: { authGuardPipe: chefOnly  }},
  { path : 'vendor/allorders' , component : AllordersComponent , canActivate : [AngularFireAuthGuard], data: { authGuardPipe: chefOnly   } },
  { path : 'admin', component : AdminComponent,  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly }},
  { path : 'chef/:id' , component : CmenusComponent, canActivate: [ AngularFireAuthGuard] , data : { authGuardPipe : adminOnly}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
