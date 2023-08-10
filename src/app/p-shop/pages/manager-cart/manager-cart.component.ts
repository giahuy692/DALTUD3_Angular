import { Component, Input, ViewChild } from '@angular/core';
import {
  GridDataResult,
  PageChangeEvent,
  PagerPosition,
  PagerType,
} from '@progress/kendo-angular-grid';
import {
  DrawerComponent,
  DrawerItem,
  DrawerMode,
} from '@progress/kendo-angular-layout';
import { DTOTransaction } from '../../share/dtos/DTOTransaction';
import { ShopApiService } from '../../share/services/shop-api.service';
import { layoutService } from '../../share/services/layout.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manager-cart',
  templateUrl: './manager-cart.component.html',
  styleUrls: ['./manager-cart.component.scss'],
})
export class ManagerCartComponent {
  @Input() dataView: any;
  @ViewChild('drawer') drawerRef: DrawerComponent;
  pageIndex: number = 1;
  productList: any;
  public loading = false;
  public expandMode: DrawerMode = 'overlay';
  public gridView: GridDataResult;
  public pagerTypes = ['numeric', 'input'];

  public type: PagerType = 'numeric';
  public buttonCount = 3;
  public info = true;
  public pageSizes = true;
  public previousNext = true;
  public pageSize = 5;
  public skip = 0;
  public sizes = [10, 20, 50];
  public form: FormGroup;
  public data = [
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
  // Biến gọi listTransaction
  Cartlist: DTOTransaction[] = [];
  currentCart = new DTOTransaction();
  constructor(private api: ShopApiService, private layout: layoutService) {
    this.form = new FormGroup({
      _id: new FormControl(this.currentCart._id, [Validators.required]),
      Qty: new FormControl(this.currentCart.Qty),
      Status: new FormControl(this.currentCart.Status),
      Amount: new FormControl(this.currentCart.Amount),
      UserName: new FormControl(this.currentCart.UserName),
      UserEmail: new FormControl(this.currentCart.UserEmail, [
        Validators.required,
        Validators.email,
      ]),
      UserPhone: new FormControl(this.currentCart.UserPhone),
      Payment: new FormControl(this.currentCart.Payment),
      Message: new FormControl(this.currentCart.Payment),
    });
  }

  ngOnInit(): void {
    this.GetListCart();
  }

  onUpdateCart() {
    this.UpdateStatusTransaction(this.form.value);
  }

  //#region lấy api
  GetListCart() {
    this.loading = true;
    this.api.GetListTransaction().subscribe(
      (v: any) => {
        this.Cartlist = v;
        this.loading = false;
      },
      (error) => {
        this.layout.showError(error);
        this.loading = false;
      }
    );
  }
  //#endregion

  onItemClickTools(itemClick: any, dtoTransaction: DTOTransaction) {
    this.currentCart = dtoTransaction;
    switch (itemClick.type) {
      case 1:
        this.form.patchValue(this.currentCart);
        this.drawerRef.toggle();
        break;
      case 2:
        this.openedDialog = true;
        break;
    }
  }

  //#region dialog
  openedDialog = false;
  handleActionDialog(status: number) {
    if (status == 1) {
      this.DeleteCart(this.currentCart);
      this.openedDialog = false;
    } else {
      this.openedDialog = false;
    }
  }
  //#endregion

  UpdateStatusTransaction(dto: DTOTransaction) {
    this.loading = true;
    this.api.UpdateStatusTransaction(dto).subscribe(
      (v: any) => {
        // Duyệt qua mảng CartList
        for (let i = 0; i < this.Cartlist.length; i++) {
          // Tìm kiếm Cart có cùng _id với DTOTransaction vừa cập nhật
          if (this.Cartlist[i]._id === v._id) {
            // Thay thế Cart cũ bằng DTOCart mới
            this.Cartlist[i] = v;
            break; // Dừng vòng lặp sau khi tìm thấy Cart cần cập nhật
          }
        }
        this.layout.showSuccess('Update Cart successful!');
        this.drawerRef.toggle();
        this.loading = false; // Kết thúc quá trình cập nhật, ẩn loading nếu có
      },
      (error) => {
        this.layout.showError(error.error.message);
        this.loading = false;
      }
    );
  }

  GetCart(dto: DTOTransaction) {
    this.api.GetTransaction(dto).subscribe(
      (v: DTOTransaction) => {
        this.currentCart = v;
      },
      (error) => {
        this.layout.showError(error); // Xử lý lỗi nếu có
        this.loading = false;
      }
    );
  }

  DeleteCart(dto: DTOTransaction) {
    this.api.DeleteTransaction(dto).subscribe(
      (v) => {
        this.GetListCart();
        this.layout.showSuccess(v._id);
      },
      (error) => {
        this.layout.showError(error); // Xử lý lỗi nếu có
        this.loading = false;
      }
    );
  }
}
