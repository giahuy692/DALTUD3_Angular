import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() arrContact: Array<{ title: string; text: string }> = [
    {
      title: 'Email',
      text: 'needhelp@Organia.com',
    },
    {
      title: 'Phone',
      text: '666 888 888',
    },
    {
      title: 'Address',
      text: '88 road, borklyn street, USA',
    },
  ];

  @Input() ContenConpany: any;
  @Input() arrHeader: any;

  constructor() {}

  ngOnInit() {}

  ngAfterOnInit() {}
}
