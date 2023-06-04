import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-group',
  templateUrl: './blog-group.component.html',
  styleUrls: ['./blog-group.component.scss'],
})
export class BlogGroupComponent {
  @Input() backgroundImage: string =
    '../../../../../assets/img/product/chat-lieu-ao-polo-airycool.jpg';
}
