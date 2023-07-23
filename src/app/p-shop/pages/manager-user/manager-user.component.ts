import { Component } from '@angular/core';

@Component({
  selector: 'app-manager-user',
  templateUrl: './manager-user.component.html',
  styleUrls: ['./manager-user.component.scss'],
})
export class ManagerUserComponent {
  public pageSize = 5;
  public buttonCount = 2;
  public sizes = [10, 20, 50];
  public gridData = [
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

  OptionList = [
    {
      text: 'EDIT',
      iconClass: 'k-icon k-i-edit',
      type: 1,
    },
    {
      text: 'DELETE',
      iconClass: 'k-icon k-i-delete',
      type: 2,
    },
  ];

  constructor() {}
  handleSearch() {}

  onKeyUp(event: any) {}
}
