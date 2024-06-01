import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductService } from './product.service';
import { MatSliderModule } from '@angular/material/slider';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailModalComponent } from './product-detail-modal/product-detail-modal.component';
import { UserDetailModalComponent } from './user-detail-modal/user-detail-modal.component';
import { UserslistComponent } from './userslist/userslist.component';
import { NavbarComponent } from './navbar/navbar.component';
//import { AddToStockModalComponent } from './add-to-stock-modal/add-to-stock-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserDetailsComponent,
    AddUserComponent,
    UserPageComponent,
    UserslistComponent,
    NavbarComponent,
    ProfileComponent,
    ProductlistComponent,
    AddProductComponent,
    ForgotPasswordComponent,
    PasswordResetComponent,
    HomeComponent,
    ContactComponent,
    ProductDetailModalComponent,
    UserDetailModalComponent,
   // AddToStockModalComponent,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSliderModule,
  ]
})
export class AppModule { }
