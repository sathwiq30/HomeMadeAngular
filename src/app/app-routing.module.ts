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


const routes: Routes = [
  { path : '' , redirectTo : 'menu',pathMatch : 'full'},
  { path : 'menu' , component : MenuComponent ,
    children: [
      {path: 'items/:id', component: ItemsComponent}
    ]
  },
  { path : 'vendor/menu' , component :  MenusComponent,
    children: [
      {path: 'item/:id', component: ItemComponent}
    ]
  },
  { path : 'cart' , component : CartComponent},
  { path : 'orders' , component : OrdersComponent},
  {path : 'login', component: LoginComponent},
  {path : 'login/:id', component: LoginComponent},
  { path : 'signup', component : SignupComponent},
  { path : 'signup/:id', component : SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
