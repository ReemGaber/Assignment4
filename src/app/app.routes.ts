import { Routes } from '@angular/router';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { authGuardGuard } from './shared/Guards/auth-guard.guard';
import { ForgetpasswordComponent } from './layout/additions/forgetpassword/forgetpassword.component';
import { ProductdetailsComponent } from './layout/additions/productdetails/productdetails.component';
import { ReqOrderComponent } from './layout/additions/req-order/req-order.component';
import { AllordersComponent } from './layout/additions/allorders/allorders.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'home',component:HomeComponent,canActivate:[authGuardGuard]},
    {path:'cart',component:CartComponent,canActivate:[authGuardGuard]},
    {path:'forgetpassword',component:ForgetpasswordComponent},
    {path:'products',component:ProductsComponent,canActivate:[authGuardGuard]},
    {path:'productDetails/:test',component:ProductdetailsComponent,canActivate:[authGuardGuard]},
    {path:'brands',component:BrandsComponent,canActivate:[authGuardGuard]},
    {path:'categories',component:CategoriesComponent,canActivate:[authGuardGuard]},
    {path:'allorders' , component : AllordersComponent, canActivate : [authGuardGuard]},
    {path:'reqOrder/:cartId',component:ReqOrderComponent,canActivate:[authGuardGuard]},
    {path:'**',component:NotfoundComponent},
];
