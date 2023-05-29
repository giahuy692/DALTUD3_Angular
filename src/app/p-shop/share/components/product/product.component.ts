import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
<<<<<<< HEAD
=======
  private _review: number = 0;
>>>>>>> main
  @Input() category: string = '';
  @Input() imgProduct: string = '';
  @Input() titleProduct: string = '';
  @Input() price: number = 0;
  @Input() discount: number = 0;
<<<<<<< HEAD
  @Input() review: number[] = Array.from({ length: 5 });

=======
  @Input() set review(value: number) {
    this._review = Math.round(value);
  }
  get review(): number {
    return this._review;
  }
  @Input() countRate: number = 0;
>>>>>>> main
  constructor() {}

  ngOnInit() {}
}
