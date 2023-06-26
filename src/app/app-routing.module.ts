import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './p-shop/pages/homepage/homepage.component';
import { AboutComponent } from './p-shop/pages/about/about.component';
import { ShopComponent } from './p-shop/pages/shop/shop.component';
import { ShopSingleComponent } from './p-shop/pages/shop-single/shop-single.component';
import { ServiceComponent } from './p-shop/pages/service/service.component';
import { ServiceSingleComponent } from './p-shop/pages/service-single/service-single.component';
import { PortfolioComponent } from './p-shop/pages/portfolio/portfolio.component';
import { PortfolioSingleComponent } from './p-shop/pages/portfolio-single/portfolio-single.component';
import { TeamComponent } from './p-shop/pages/team/team.component';
import { BlogComponent } from './p-shop/pages/blog/blog.component';
import { BlogSingleComponent } from './p-shop/pages/blog-single/blog-single.component';
import { ContactComponent } from './p-shop/pages/contact/contact.component';
import { PasswordProtectComponent } from './p-shop/pages/password-protect/password-protect.component';
import { LoginComponent } from './p-shop/pages/login/login.component';
import { CanActivate, Router } from '@angular/router';
import { AuthGuard } from './AuthGuard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'shop', component: ShopComponent, canActivate: [AuthGuard] },
  {
    path: 'shopDetail/:productID',
    component: ShopSingleComponent,
    canActivate: [AuthGuard],
  },
  { path: 'service', component: ServiceComponent, canActivate: [AuthGuard] },
  {
    path: 'service/service-detail',
    component: ServiceSingleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'portfolio/portfolio-detail',
    component: PortfolioSingleComponent,
    canActivate: [],
  },
  { path: 'team', component: TeamComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/blog-detail', component: BlogSingleComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'password-protect', component: PasswordProtectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
