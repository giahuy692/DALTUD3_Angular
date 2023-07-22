import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-manager-product',
  templateUrl: './manager-product.component.html',
  styleUrls: ['./manager-product.component.scss'],
})
export class ManagerProductComponent implements OnInit {
  arrUnsubscribe: Subscription[] = [];
  data: DTOProduct[];
  listProduct: DTOProduct[];
  limit: number = 20;
  limits: number[] = [10, 20, 50];
  selectedValue: number = 20;
  currentPage: number = 1;
  public CategoryList: Array<string> = ['Man', 'Woman', 'Couple'];

  constructor(
    private apiService: ShopApiService,
    private notificationService: NotificationService
  ) {}

  private interval: any;

  ngOnInit(): void {
    this.GetListProduct(1, 100, undefined);
  }

  //#region Our product

  GetListProduct(page?: number, pageSize?: number, sort?: string) {
    let GetListProduct = this.apiService
      .GetListProduct(page, pageSize, sort)
      .subscribe(
        (v: any) => {
          this.listProduct = v.products;
        },
        (errr) => {
          console.log(errr);
        }
      );

    this.arrUnsubscribe.push(GetListProduct);
  }

  GetProduct(_id: string) {
    let GetProduct = this.apiService.GetProduct(_id);
  }

  onclick() {
    console.log('click thành công');
  }

  onDelete(value: any) {
    console.log(value);
    let onDelete = this.apiService.DeleteProduct(value).subscribe(
      (v) => {
        this.GetListProduct(1, 100, undefined);

        this.notificationService.show({
          content: 'Delete product success',
          hideAfter: 600,
          position: { horizontal: 'left', vertical: 'bottom' },
          animation: { type: 'fade', duration: 400 },
          type: { style: 'success', icon: true },
        });
      },
      (errr) => {
        console.log(errr);
      }
    );
    this.arrUnsubscribe.push(onDelete);
  }

  public ngOnDestroy(): void {
    clearInterval(this.interval);
    this.arrUnsubscribe.forEach((s) => {
      s?.unsubscribe();
    });
  }
}
