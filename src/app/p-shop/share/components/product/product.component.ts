import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  private _review: number = 0;
  @Input() category: string = '';
  @Input() imgProduct: string = '';
  @Input() titleProduct: string = '';
  @Input() price: number = 0;
  @Input() discount: number = 0;
  @Input() set review(value: number) {
    this._review = Math.round(value);
  }
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
      category: this.category,
      image: this.imgProduct,
      title: this.titleProduct,
      price: this.price,
      discount: this.discount,
      review: this.review,
      rating: {
        count: this.countRate,
        rate: this.rate,
      },
    });
  }
}