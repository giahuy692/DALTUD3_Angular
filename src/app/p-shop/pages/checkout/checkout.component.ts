import { Component } from '@angular/core';
import { DTOOrder } from '../../share/dtos/DTOOrder';
import { ShopApiService } from '../../share/services/shop-api.service';
import { layoutService } from '../../share/services/layout.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../share/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  public form: FormGroup;
  public loading = false;
  user: any;

  Orders: DTOOrder[] = [];
  currentOrder = new DTOOrder();
  totalAmount: number = 0;
  constructor(
    private api: ShopApiService,
    private layout: layoutService,
    private auth: AuthService
  ) {
    this.user = this.auth.getInfoUser();
    this.form = new FormGroup({
      _id: new FormControl(this.currentOrder._id, [Validators.required]),
      paymentID: new FormControl(this.currentOrder.paymentID),
      paymentName: new FormControl(this.currentOrder.paymentName),
      ProductId: new FormControl(this.currentOrder.ProductId),
      ProductName: new FormControl(this.currentOrder.ProductName),
      Qty: new FormControl(this.currentOrder.Qty, [Validators.required]),
      Amount: new FormControl(this.currentOrder.Amount),
      Status: new FormControl(this.currentOrder.Status),
    });
    // console.log(this.currentOrder)
  }

  ngOnInit(): void {
    this.GetListOrder();
  }

  //#region lấy api
  GetListOrder() {
    this.loading = true;
    this.api.GetListOrder().subscribe(
      (v: any) => {
        this.Orders = v;
        this.calculateTotalAmount();
        this.loading = false;
      },
      (error) => {
        this.layout.showError(error);
        this.loading = false;
      }
    );
  }
  //#endregion

  //#region tính tổng giá trị Amount
  calculateTotalAmount() {
    this.totalAmount = this.Orders.reduce(
      (total, order) => total + order.Amount,
      0
    );
  }

  GetOrder(dto: DTOOrder) {
    this.api.GetOrder(dto).subscribe(
      (v: DTOOrder) => {
        this.Orders = [v];
      },
      (error) => {
        this.layout.showError(error);
        this.loading = false;
      }
    );
  }
}
