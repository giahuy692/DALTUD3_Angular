import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './p-shop/pages/homepage/homepage.component';
import { AboutComponent } from './p-shop/pages/about/about.component';
import { ShopComponent } from './p-shop/pages/shop/shop.component';
import { ShopSingleComponent } from './p-shop/pages/shop-single/shop-single.component';
import { PortfolioComponent } from './p-shop/pages/portfolio/portfolio.component';
import { PortfolioSingleComponent } from './p-shop/pages/portfolio-single/portfolio-single.component';
import { TeamComponent } from './p-shop/pages/team/team.component';
import { ContactComponent } from './p-shop/pages/contact/contact.component';
import { ErrorComponent } from './p-shop/pages/error/error.component';
import { PasswordProtectComponent } from './p-shop/pages/password-protect/password-protect.component';
import { HeaderComponent } from './p-shop/share/components/header/header.component';
import { FooterComponent } from './p-shop/share/components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsModule } from '@progress/kendo-angular-icons';
import { LabelModule } from '@progress/kendo-angular-label';
import { MapService } from './p-shop/share/services/map.service';
import { ShopApiService } from './p-shop/share/services/shop-api.service';
import { ProductComponent } from './p-shop/share/components/product/product.component';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';

import { NotificationModule } from '@progress/kendo-angular-notification'; // cái lỗi này thì npm i
import { TooltipsModule } from '@progress/kendo-angular-tooltip'; // cái lỗi này thì npm i
import { GroupComponent } from './p-shop/share/components/group/group.component';
import { BlogGroupComponent } from './p-shop/share/components/blog-group/blog-group.component';
import { DatePipe } from '@angular/common';
import { NgModel } from '@angular/forms';
import { DateFormatPipePipe } from './p-shop/share/pipe/date-format-pipe.pipe';
import { LoginComponent } from './p-shop/pages/login/login.component';
import { RegisterComponent } from './p-shop/pages/register/register.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { CartComponent } from './p-shop/pages/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AboutComponent,
    ShopComponent,
    ShopSingleComponent,
    PortfolioComponent,
    PortfolioSingleComponent,
    TeamComponent,
    ContactComponent,
    ErrorComponent,
    PasswordProtectComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    GroupComponent,
    BlogGroupComponent,
    DateFormatPipePipe,
    LoginComponent,
    RegisterComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
    InputsModule,
    LayoutModule,
    FontAwesomeModule,
    IconsModule,
    LabelModule,
    HttpClientModule,
    ScrollViewModule,
    NotificationModule,
    TooltipsModule,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
  ],
  providers: [MapService, ShopApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
