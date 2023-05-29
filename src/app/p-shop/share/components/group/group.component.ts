import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  @Input() image: string =
    '../../../../../assets/img/product/ao-polo-nam-apm3519-xng-9-yodyvn.jpg';
  @Input() name: string = 'Giovani Bacardo';
  @Input() role: string = 'Farmer';
  @Input() facebook: string = '';
  @Input() instagram: string = '';
  @Input() twitter: string = '';
}
