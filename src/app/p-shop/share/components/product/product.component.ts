import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() category: string = '';
  @Input() imgProduct: string = '';
  @Input() titleProduct: string = '';
  @Input() price: number = 0;
  @Input() discount: number = 0;
  @Input() review: number[] = Array.from({ length: 5 });

  constructor() {}

  ngOnInit() {}
}
