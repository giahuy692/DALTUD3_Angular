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

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop/shop-detail', component: ShopSingleComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'service/service-detail', component: ServiceSingleComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'portfolio/portfolio-detail', component: PortfolioSingleComponent },
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
