import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserslistComponent } from './userslist/userslist.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserPageComponent } from './user-page/user-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './updateproduct/updateproduct.component'; // Import UpdateProductComponent
import { ProductService } from './product.service';
import { MatSliderModule } from '@angular/material/slider';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    UserslistComponent,
    UserDetailsComponent,
    AddUserComponent,
    UserPageComponent,
    NavbarComponent,
    ProfileComponent,
    ProductlistComponent,
    AddProductComponent,
    UpdateProductComponent, // Include UpdateProductComponent here
    ForgotPasswordComponent,
    PasswordResetComponent,
    HomeComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSliderModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
