import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() itemMenu: Array<{
    id: number;
    text: string;
    img?: string;
    arrDropDown?: [];
  }> = [
    { id: 0, text: 'Home' },
    { id: 1, text: 'About' },
    { id: 2, text: 'Pages', arrDropDown: [] },
    { id: 3, text: 'Shop' },
    { id: 4, text: 'Project' },
    { id: 5, text: 'News' },
  ];
}
