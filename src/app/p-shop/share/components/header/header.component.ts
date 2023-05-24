import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() Count?: number = 0;
  dFlex = 'display: flex; column-gap: 10px; align-items: center;';
  @Input() itemMenu: Array<{
    id: number;
    text: string;
    img?: string;
    arrDropDown?: string[];
  }> = [
    { id: 0, text: 'Home' },
    { id: 1, text: 'About' },
    {
      id: 2,
      text: 'Pages',
      arrDropDown: [
        'My Profile',
        'Friend Requests',
        'Account Settings',
        'Support',
        'Log Out',
      ],
    },
    { id: 3, text: 'Shop' },
    { id: 4, text: 'Project' },
    { id: 5, text: 'News' },
  ];
}
