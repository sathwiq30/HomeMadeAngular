import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MainnavComponent } from './mainnav/mainnav.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MatCardModule, MatInputModule, MatProgressSpinnerModule, MatRippleModule, MatIconModule, MatSnackBarModule, MatButtonModule, MatTableModule, MatExpansionModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { OrdersComponent } from './orders/orders.component';
import { MenuComponent } from './menu/menu.component';
import { ItemsComponent } from './menu/items/items.component';
import { HomeComponent } from './home/home.component';
import { MenusComponent } from './vendor/menus/menus.component';
import { CategoryComponent } from './vendor/menus/category/category.component';
import { ItemComponent } from './vendor/menus/item/item.component';
import { CartComponent } from './cart/cart.component';
import { CitemComponent } from './cart/citem/citem.component';
import { UnconfirmedComponent } from './vendor/orders/unconfirmed/unconfirmed.component';
import { PreparingComponent } from './vendor/orders/preparing/preparing.component';
import { OrderComponent } from './vendor/order/order.component';
import { AllordersComponent } from './vendor/orders/allorders/allorders.component';
import { AddressComponent } from './cart/address/address.component'
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainnavComponent,
    LoginComponent,
    SignupComponent,
    OrdersComponent,
    MenuComponent,
    ItemsComponent,
    HomeComponent,
    MenusComponent,
    CategoryComponent,
    ItemComponent,
    CartComponent,
    CitemComponent,
    UnconfirmedComponent,
    PreparingComponent,
    OrderComponent,
    AllordersComponent,
    AddressComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    MatStepperModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
