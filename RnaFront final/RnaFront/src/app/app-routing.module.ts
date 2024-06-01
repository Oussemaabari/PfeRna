import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserslistComponent } from './userslist/userslist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { AddProductComponent } from './add-product/add-product.component'; // Import the AddProductComponent
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { UpdateProductComponent } from './updateproduct/updateproduct.component'; // Import the UpdateProductComponent

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'user-page', component: UserPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'userslist', component: UserslistComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'user-details/:userId', component: UserDetailsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'products', component: ProductlistComponent },
  { path: 'add-product', component: AddProductComponent }, // Route for the add product page
  { path: 'updateproduct/:id', component: UpdateProductComponent }, // Route for the update product page

  { path: 'reset-password', component: PasswordResetComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent }, // Assuming ContactComponent is your component for the contact page

  { path: 'login', redirectTo: '/userslist', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' } // Uncomment if you want to redirect unknown paths to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
