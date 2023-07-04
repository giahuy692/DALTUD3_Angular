import { Component } from '@angular/core';

class Order {
  fullname: string = '';
  address: string = '';
  phone: number;
  email: string = '';
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  inforOrder = new Order();
  isCheckout = false;
  gridData = [
    {
      ProductID: 1,
      ProductName: 'Chai',
      UnitPrice: 18,
      Category: {
        CategoryID: 1,
        CategoryName: 'Beverages',
      },
    },
    {
      ProductID: 2,
      ProductName: 'Chang',
      UnitPrice: 19,
      Category: {
        CategoryID: 1,
        CategoryName: 'Beverages',
      },
    },
    {
      ProductID: 3,
      ProductName: 'Aniseed Syrup',
      UnitPrice: 10,
      Category: {
        CategoryID: 2,
        CategoryName: 'Condiments',
      },
    },
  ];

  pageSize: number;

  ngOnInit() {
    this.pageSize = this.gridData.length;
  }

  onCheckout() {
    this.isCheckout = true;
  }
}
