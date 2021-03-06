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
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import {MatTabsModule} from '@angular/material/tabs';
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

import { SigninComponent } from './vendor/auth/signin/signin.component';
import { RegisterComponent } from './vendor/auth/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { AgmCoreModule} from '@agm/core';
import { MapAddressComponent } from './maps/map-address/map-address.component';
import { ProfileComponent } from './profile/profile.component';
import { ChefProfileComponent } from './vendor/chef-profile/chef-profile.component';
import { TrackingComponent } from './tracking/tracking.component';
import { AddchefComponent } from './admin/addchef/addchef.component';
import { ChefsprofileComponent } from './admin/chefsprofile/chefsprofile.component';
import { CmenusComponent } from './admin/cmenus/cmenus.component';
import { ChefcategoryComponent } from './admin/cmenus/chefcategory/chefcategory.component';
import { ChefitemComponent } from './admin/cmenus/chefitem/chefitem.component'

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
    AddressComponent,
    SigninComponent,
    RegisterComponent,
    AdminComponent,
    MapAddressComponent,
    ProfileComponent,
    ChefProfileComponent,
    TrackingComponent,
    AddchefComponent,
    ChefsprofileComponent,
    CmenusComponent,
    ChefcategoryComponent,
    ChefitemComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    FormsModule,
    MatStepperModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFirestoreModule,
    BrowserModule,
    MatTabsModule,
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyBRjyQl1jUy91eDut-wPVeaX1E-6TuEB0M',
      libraries: ['places']
    })
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
