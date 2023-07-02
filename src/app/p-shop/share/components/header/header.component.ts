import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router, private mapService: MapService) {}

  @Input() Count?: number = 0;
  dFlex = 'display: flex; column-gap: 10px; align-items: center;';
  @Input() itemMenu: Array<{
    id: number;
    text: string;
    img?: string;
    arrDropDown?: btnMenu[];
    link?: string;
  }> = [
    { id: 0, text: 'Home', link: '/home' },
    { id: 1, text: 'About', link: '/about' },
    { id: 2, text: 'Shop', link: '/shop' },
    { id: 4, text: 'Portfolio', link: '/portfolio' },
    { id: 5, text: 'Team', link: '/team' },
    { id: 7, text: 'Contact', link: '/contact' },
  ];

  // handle xử lý việc bấm vào item nào
  onItemClick(item: any) {
    switch (item.text) {
      case 'Home':
        this.router.navigate([item.link]);
        break;
      case 'About':
        this.router.navigate([item.link]);
        break;
      case 'Shop':
        this.router.navigate([item.link]);
        break;
      case 'Service':
        this.router.navigate([item.link]);
        break;
      case 'Portfolio':
        this.router.navigate([item.link]);
        break;
      case 'Team':
        this.router.navigate([item.link]);
        break;
      case 'Blog':
        this.router.navigate([item.link]);
        break;
      case 'Contact':
        this.router.navigate([item.link]);
        break;
    }
    this.router.navigate(['/other-route']);
  }

  ngOnInit() {
    this.mapService.arrHeader.next(this.itemMenu);
  }
}
