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
    this.arrUnsubscribe.push(GetProductSingle);
  }

  public onButtonClick(): void {
    console.log('click');
  }
}
