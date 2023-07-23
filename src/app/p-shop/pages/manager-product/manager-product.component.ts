import { Component, OnInit } from '@angular/core';
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

  GetProduct(_id: string) {
    let GetProduct = this.apiService.GetProduct(_id);
  }

  onclick() {
    console.log('click thành công');
  }

  public showConfirmation(): void {
    const dialog: DialogRef = this.dialogService.open({
      title: 'Please confirm',
      content:
        'Do you want delete {{product.name}}?, You will not restore when you delete, are you sure?',
      actions: [{ text: 'No' }, { text: 'Yes', themeColor: 'primary' }],
      width: 450,
      height: 200,
      minWidth: 250,
    });

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        console.log('close');
      } else {
        // Xử lý khi người dùng chọn "Yes"
        if (result.text === 'Yes') {
          alert('thuc hien xoa');
          //this.deleteProduct(); // Gọi phương thức xóa sản phẩm tại đây
        }
        console.log('action', result);
      }

      this.result = JSON.stringify(result);
    });
  }

  onDelete(value: any) {
    console.log(value);
    let onDelete = this.apiService.DeleteProduct(value).subscribe(
      (v) => {
        this.GetListProduct(1, 100, undefined);
        this.layout.showSuccess('Delete product success');
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
