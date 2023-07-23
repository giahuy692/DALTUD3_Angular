import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  data: DTOProduct[];
  productSingle: DTOProduct;
  listProductLimit: any;
  arrUnsubscribe: Subscription[] = [];

  constructor(
    private apiService: ShopApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  //#region Our product
  getData() {
    let getData = this.apiService.GetListProduct().subscribe(
      (v: any) => {
        this.data = v;
      },
      (error) => {
        console.log(error);
      }
    );

    this.arrUnsubscribe.push(getData);
  }

  // Handle lấy product detail
  GetProductSingle(data: DTOProduct) {
    let GetProductSingle = this.apiService
      .GetProduct(data._id)
      .subscribe((v) => {
        this.productSingle = v;
      });
    //=============================================================================
    // // data: DTOProduct là giá nhận được khi click vào 1 sản phẩm
    // this.apiService.GetProduct(data._id).subscribe((v: any) => {
    //   // Api GetProduct truyền (data._id )
    //   this.productSingle = v; // Nhận được product đetail từ api trả về dự vào _id được truyền là data._id gán vào biến productSingle
    //   console.log('productSingle', this.productSingle); // console ra giá trị hiện tại của productSingle

    // });
    this.arrUnsubscribe.push(GetProductSingle);
  }

  public onButtonClick(): void {
    console.log('click');
  }
}
