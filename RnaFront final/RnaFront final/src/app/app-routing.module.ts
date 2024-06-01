import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { AddProductComponent } from './add-product/add-product.component'; // Import the AddProductComponent
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailModalComponent } from './product-detail-modal/product-detail-modal.component';
import { UserslistComponent } from './userslist/userslist.component';
import {OrderListComponent } from './order-list/order-list.component';
import { RespDepotDashboardComponent } from './resp-depot-dashboard/resp-depot-dashboard.component';
import { OrderStatisticsComponent } from './order-statistics/order-statistics.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
//import { AddCommandeComponent } from './add-commande/add-commande.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'user-page', component: UserPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'userslist', component: UserslistComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'add-product', component: AddProductComponent }, // Route for the add product page
  { path: 'products', component: ProductlistComponent }, // ':id' represents the productId parameter

  { path: 'reset-password', component: PasswordResetComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent }, // Assuming ContactComponent is your component for the contact page

  { path: 'order-list', component: OrderListComponent }, // Define the route for the Order List component
  { path: 'resp-depot-dashboard', component: RespDepotDashboardComponent },
  { path: 'my-orders', component: MyOrdersComponent }, // Add the MyOrdersComponent route here
  { path: 'product-detail-modal', component: ProductDetailModalComponent }, // Assuming ContactComponent is your component for the contact page
  { path: 'statistics', component: OrderStatisticsComponent } ,// Add the new route

  { path: 'login', redirectTo: '/userslist', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
