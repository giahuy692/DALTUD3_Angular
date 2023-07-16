import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  private _review: number = 0;
  @Input() imgProduct: string = '';
  @Input() titleProduct: string = '';
  @Input() price: number = 0;
  @Input() id: number;
  get review(): number {
    return this._review;
  }
  @Input() countRate: number = 0;
  @Input() rate: number = 0;

  @Output() clickItem = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  onClick() {
    this.clickItem.emit({
      id: this.id,
      image: this.imgProduct,
      title: this.titleProduct,
      price: this.price,
      review: this.review,
      rating: {
        count: this.countRate,
        rate: this.rate,
      },
    });
  }
}
