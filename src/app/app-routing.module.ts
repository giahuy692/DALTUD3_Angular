import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './p-shop/pages/homepage/homepage.component';
import { AboutComponent } from './p-shop/pages/about/about.component';
import { ShopComponent } from './p-shop/pages/shop/shop.component';
import { ShopSingleComponent } from './p-shop/pages/shop-single/shop-single.component';
import { PortfolioComponent } from './p-shop/pages/portfolio/portfolio.component';
import { PortfolioSingleComponent } from './p-shop/pages/portfolio-single/portfolio-single.component';
import { TeamComponent } from './p-shop/pages/team/team.component';
import { ContactComponent } from './p-shop/pages/contact/contact.component';
import { PasswordProtectComponent } from './p-shop/pages/password-protect/password-protect.component';
import { LoginComponent } from './p-shop/pages/login/login.component';
import { ErrorComponent } from './p-shop/pages/error/error.component';
import { CanActivate, Router } from '@angular/router';
import { AuthGuard } from './AuthGuard';
import { CartComponent } from './p-shop/pages/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'shop', component: ShopComponent },
  {
    path: 'shopDetail/:productID',
    component: ShopSingleComponent,
  },

  {
    path: 'portfolio',
    component: PortfolioComponent,
  },
  {
    path: 'portfolio/portfolio-detail',
    component: PortfolioSingleComponent,
  },
  { path: 'team', component: TeamComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contact', component: ContactComponent },
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
