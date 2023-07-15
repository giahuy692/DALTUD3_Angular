import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MapService } from 'src/app/p-shop/share/services/map.service';

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
  constructor(public router: Router, private mapService: MapService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.isAdminPage()) {
          this.itemMenu = this.Login;
        } else {
          this.itemMenu = this.NotLogin;
        }
      }
    });
  }

  @Input() Count?: number = 0;
  dFlex = 'display: flex; column-gap: 10px; align-items: center;';
  @Input() itemMenu: Array<{
    id: number;
    text: string;
    img?: string;
    arrDropDown?: btnMenu[];
    link?: string;
  }>;

  NotLogin = [
    { id: 0, text: 'Home', link: '/home' },
    { id: 1, text: 'About', link: '/about' },
    { id: 2, text: 'Shop', link: '/shop' },
    { id: 4, text: 'News', link: '/news' },
    { id: 5, text: 'Man', link: '/man' },
    { id: 6, text: 'Women', link: '/women' },
    { id: 7, text: 'Couple', link: '/couple' },
    { id: 8, text: 'Contact', link: '/contact' },
  ];

  Login = [
    { id: 0, text: 'User', link: 'admin/user' },
    { id: 1, text: 'Product', link: 'admin/product' },
    { id: 2, text: 'Cart', link: 'admin/cart' },
  ];

  isAdminPage(): boolean {
    return this.router.url.includes('/admin');
  }

  // handle xử lý việc bấm vào item nào
  onItemClick(item: any) {
    this.router.navigate([item.link]);
  }

  ngOnInit() {
    this.mapService.arrHeader.next(this.itemMenu);
  }
}
