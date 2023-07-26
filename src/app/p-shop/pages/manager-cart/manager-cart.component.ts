import { Component, Input } from '@angular/core';
import { GridDataResult, PageChangeEvent, PagerPosition, PagerType } from '@progress/kendo-angular-grid';
import { DrawerItem, DrawerMode } from '@progress/kendo-angular-layout';
import { bellIcon, calendarIcon, envelopLinkIcon, inboxIcon, starOutlineIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-manager-cart',
  templateUrl: './manager-cart.component.html',
  styleUrls: ['./manager-cart.component.scss']
})
export class ManagerCartComponent {
  @Input() dataView: any;
  pageIndex: number = 1;
  productList: any;


  public data = [{text: 'Cập nhật trạng thái', iconClass: 'k-icon k-i-edit' }];
  public expandMode: DrawerMode = "overlay";
  public gridView: GridDataResult;
  public pagerTypes = ["numeric", "input"];

  public type: PagerType = "numeric";
  public buttonCount = 5;
  public info = true;
  public pageSizes = true;
  public previousNext = true;
  public position: PagerPosition = "bottom";

  public pageSize = 5;
  public skip = 0;
  public sizes = [10, 20, 50];
  
  public gridData = [
    {
      name: "Johnd",
      quantity: 5,
      amount: 500,
      email: "...@gmail.com",
      phonenb: 847835559,
    },
    {
      name: "Johnd",
      quantity: 5,
      amount: 500,
      email: "...@gmail.com",
      phonenb: 847835559,
    },
    {
      name: "Johnd",
      quantity: 5,
      amount: 500,
      email: "...@gmail.com",
      phonenb: 847835559,
    },
    {
      name: "Johnd",
      quantity: 5,
      amount: 500,
      email: "...@gmail.com",
      phonenb: 847835559,
    },
    {
      name: "Johnd",
      quantity: 5,
      amount: 500,
      email: "...@gmail.com",
      phonenb: 847835559,
    },
    {
      name: "Johnd",
      quantity: 5,
      amount: 500,
      email: "...@gmail.com",
      phonenb: 847835559,
    },
    {
      name: "Johnd",
      quantity: 5,
      amount: 500,
      email: "...@gmail.com",
      phonenb: 847835559,
    },
    {
      name: "Johnd",
      quantity: 5,
      amount: 500,
      email: "...@gmail.com",
      phonenb: 847835559,
    },
    {
      name: "Johnd",
      quantity: 5,
      amount: 500,
      email: "...@gmail.com",
      phonenb: 847835559,
    },
    {
      name: "Johnd",
      quantity: 5,
      amount: 500,
      email: "...@gmail.com",
      phonenb: 847835559,
    },
    {
      name: "Johnd",
      quantity: 5,
      amount: 500,
      email: "...@gmail.com",
      phonenb: 847835559,
    },
  ];
  
  private items = this.gridData;
  
  constructor() {
    this.loadItems();
  }

  public pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.loadItems();
  }

  public loadItems(): void {
    this.gridView = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length,
    };
  }


  
  public item: Array<DrawerItem> = [
    { text: "Inbox", svgIcon: inboxIcon, selected: true },
    { separator: true },
    { text: "Notifications", svgIcon: bellIcon },
    { text: "Calendar", svgIcon: calendarIcon },
    { separator: true },
    { text: "Attachments", svgIcon: envelopLinkIcon },
    { text: "Favourites", svgIcon: starOutlineIcon },
  ];

  public onExpandModeChange(checked: boolean): void {
    this.expandMode = checked ? "overlay" : "push";
  }

}
