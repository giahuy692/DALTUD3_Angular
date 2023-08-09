import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { DTOProduct } from '../../dtos/DTOProduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input({ required: true }) item: DTOProduct;

  @Output() clickItem = new EventEmitter<any>();
  constructor(public cartService: CartService) {}

  ngOnInit() {}

  onClick() {
    this.clickItem.emit(this.item);
  }
}
