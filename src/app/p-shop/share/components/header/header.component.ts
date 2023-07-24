import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ShopApiService } from '../../services/shop-api.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { DTOUser } from '../../dtos/DTOUser';
import { AuthService } from '../../services/auth.service';
import { layoutService } from '../../services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
  implements OnInit, AfterViewInit, AfterContentChecked
{
  isAdmin: boolean = false;
  user: any;
  constructor(
    public router: Router,
    private ApiService: ShopApiService,
    public layout: layoutService,
    private auth: AuthService
  ) {
    this.user = this.auth.getInfoUser();
  }
  ngAfterContentChecked(): void {
    const route = location.href;
    if (route.includes('/admin')) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    this.user = this.auth.getInfoUser();
  }

  ngOnInit() {}

  ngAfterViewInit(): void {}

  onLogout() {
    this.ApiService.Logout().subscribe(
      (v) => {
        this.layout.showSuccess(v.message);
        this.router.navigate(['/login']);
      },
      (error) => {
        this.layout.showError(error);
      }
    );
    this.user = null;
    this.isAdmin = false;
  }
  isAdminPage(route: any): boolean {
    return route.includes('/admin');
  }
}
