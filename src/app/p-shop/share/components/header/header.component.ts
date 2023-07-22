import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MapService } from 'src/app/p-shop/share/services/map.service';
import { ShopApiService } from '../../services/shop-api.service';
import { NotificationService } from '@progress/kendo-angular-notification';

class btnMenu {
  id: number = 0;
  text: string = '';
  img?: string;
  arrDropDown?: btnMenu[];
  link?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
  constructor(
    public router: Router,
    private ApiService: ShopApiService,
    private noti: NotificationService
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
  }
  isAdminPage(): boolean {
    return this.router.url.includes('/admin');
  }
}
