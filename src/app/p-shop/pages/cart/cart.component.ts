import { Component } from '@angular/core';
import { DTOOrder } from '../../share/dtos/DTOOrder';
import { ShopApiService } from '../../share/services/shop-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  inforOrder = new DTOOrder();
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
  arrUnsubscribe: Subscription[] = [];

  pageSize: number;
  notificationService: any;

  constructor(private apiService: ShopApiService) {}

  ngOnInit() {
    this.pageSize = this.gridData.length;
  }

  onCheckout() {
    this.isCheckout = true;
  }

  clicks() {
    console.log(this.inforOrder);
  }

  arrOrder: DTOOrder[] = [];
  UpdateOrder(dto: DTOOrder) {
    let a = { ...dto };
    this.arrOrder.push(dto);
    console.log(this.arrOrder);
    let b = {
      ProductName: 'Test', // tên sản phẩm
      CatalogId: '64b157dee27407f744b4bcf6', // ID của categody
      Discount: 30,
      Price: 1200000,
      Description: 'Mô tả',
      Quantity: 50,
      Image_link: '',
      Image_list: [],
    };
    this.CreateProduct(b);
  }

  CreateProduct(dto: any) {
    let CreateProduct = this.apiService.AddNewProduct(dto).subscribe(
      (v) => {
        this.notificationService.show({
          content: 'Thêm sản phẩm thành công',
          animation: { type: 'slide', duration: 400 },
          position: { horizontal: 'center', vertical: 'bottom' },
          type: { style: 'error', icon: true },
        });
      },
      (err) => {
        this.notificationService.show({
          content: 'Thêm sản phẩm thất bại',
          animation: { type: 'slide', duration: 400 },
          position: { horizontal: 'center', vertical: 'bottom' },
          type: { style: 'error', icon: true },
        });
      }
    );

    this.arrUnsubscribe.push(CreateProduct);
  }

  public ngOnDestroy(): void {
    this.arrUnsubscribe.forEach((s) => {
      s?.unsubscribe();
    });
  }
}
