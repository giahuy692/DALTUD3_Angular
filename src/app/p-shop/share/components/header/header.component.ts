import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ShopApiService } from '../../services/shop-api.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { DTOUser } from '../../dtos/DTOUser';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isAdmin: boolean = false;
  user: any;
  constructor(
    public router: Router,
    private ApiService: ShopApiService,
    private noti: NotificationService,
    private auth: AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.isAdminPage()) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.user = this.auth.getInfoUser();
  }

  onLogout() {
    this.ApiService.Logout().subscribe((v) => {
      this.noti.show({
        content: v.message,
        cssClass: 'button-notification',
        animation: { type: 'slide', duration: 400 },
        position: { horizontal: 'left', vertical: 'bottom' },
        type: { style: 'success', icon: true },
      });
    });
    this.user = null;
  }
  isAdminPage(): boolean {
    return this.router.url.includes('/admin');
  }
}
