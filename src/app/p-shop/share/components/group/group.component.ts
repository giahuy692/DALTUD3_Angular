import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  @Input() image: string = '';
  @Input() name: string = '';
  @Input() role: string = '';
  @Input() facebook: string = '';
  @Input() instagram: string = '';
  @Input() twitter: string = '';
}