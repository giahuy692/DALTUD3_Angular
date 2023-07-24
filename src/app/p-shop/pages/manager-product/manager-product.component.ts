import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { NotificationService } from '@progress/kendo-angular-notification';
import {
  DialogCloseResult,
  DialogRef,
  DialogService,
} from '@progress/kendo-angular-dialog';
import { layoutService } from '../../share/services/layout.service';

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
  public result: string;

  constructor(
    private apiService: ShopApiService,
    private notificationService: NotificationService,
    private layout: layoutService,
    private dialogService: DialogService
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

  // GetProduct(_id: string) {
  //   let GetProduct = this.apiService.GetProduct(_id).subscribe((v)=>{

  //   });
  // }

  //# Delete Product

  onclick() {
    console.log('click thành công');
  }

  // onDelete(value: any) {
  //   console.log(value);
  // let onDelete = this.apiService.DeleteProduct(value).subscribe(
  //   (v) => {
  //     this.GetListProduct(1, 100, undefined);
  //     this.layout.showSuccess('Delete product success');
  //   },
  //   (errr) => {
  //     console.log(errr);
  //   }
  // );
  // this.arrUnsubscribe.push(onDelete);
  // }

  //# Dialog thực hiện sau khi cick nút xóa
  @ViewChild('btn') btnRef: { nativeElement: { focus: () => void } };

  itemProduct: any;

  public opened = false;
  public close(): void {
    this.opened = false;
    this.btnRef.nativeElement.focus();
  }

  public open(Item: any): void {
    this.itemProduct = Item;
    this.opened = true;
  }

  //thực hiện xóa
  onDelete() {
    alert('Xóa ' + this.itemProduct.ProductName + ' thành công');
    // console.log(this.itemProduct);

    // let deleteProduct = this.apiService
    //   .DeleteProduct(this.itemProduct)
    //   .subscribe(
    //     (v) => {
    //       this.GetListProduct(1, 100, undefined);
    //       this.layout.showSuccess('Delete product success');
    //     },
    //     (errr) => {
    //       console.log(errr);
    //     }
    //   );
    // this.arrUnsubscribe.push(deleteProduct);

    this.opened = false;
    this.btnRef.nativeElement.focus();
  }
  // # End dialog

  public ngOnDestroy(): void {
    clearInterval(this.interval);
    this.arrUnsubscribe.forEach((s) => {
      s?.unsubscribe();
    });
  }
}
