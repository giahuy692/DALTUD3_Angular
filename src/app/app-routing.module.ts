import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './p-shop/pages/homepage/homepage.component';
import { AboutComponent } from './p-shop/pages/about/about.component';
import { ShopComponent } from './p-shop/pages/shop/shop.component';
import { ShopSingleComponent } from './p-shop/pages/shop-single/shop-single.component';
import { NewsComponent } from './p-shop/pages/news/news.component';
import { PortfolioSingleComponent } from './p-shop/pages/portfolio-single/portfolio-single.component';
import { ManComponent } from './p-shop/pages/man/man.component';
import { WomenComponent } from './p-shop/pages/women/women.component';
import { ContactComponent } from './p-shop/pages/contact/contact.component';
import { PasswordProtectComponent } from './p-shop/pages/password-protect/password-protect.component';
import { LoginComponent } from './p-shop/pages/login/login.component';
import { ErrorComponent } from './p-shop/pages/error/error.component';
import { CanActivate, Router } from '@angular/router';
import { AuthGuard } from './AuthGuard';
import { CartComponent } from './p-shop/pages/cart/cart.component';
import { ManagerUserComponent } from './p-shop/pages/manager-user/manager-user.component';
import { ManagerCartComponent } from './p-shop/pages/manager-cart/manager-cart.component';
import { ManagerProductComponent } from './p-shop/pages/manager-product/manager-product.component';
import { RegisterComponent } from './p-shop/pages/register/register.component';
import { CoupleComponent } from './p-shop/pages/couple/couple.component';
import { CheckoutComponent } from './p-shop/pages/checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'shop', component: ShopComponent },
  {
    path: 'shopDetail/:productID',
    component: ShopSingleComponent,
  },

  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'portfolio/portfolio-detail',
    component: PortfolioSingleComponent,
  },
  { path: 'man', component: ManComponent },
  { path: 'women', component: WomenComponent },
  { path: 'couple', component: CoupleComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'admin/user',
    component: ManagerUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/cart',
    component: ManagerCartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/product',
    component: ManagerProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'password-protect',
    component: PasswordProtectComponent,
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
