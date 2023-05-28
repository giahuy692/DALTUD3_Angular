import { Component, OnInit } from '@angular/core';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  data: DTOProduct[];
  productSingle: any;
  listProductLimit: any;

  constructor(
    private apiService: ShopApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getProductSingle();
    this.getListProductLimit();
  }

  getData() {
    this.apiService.getListProduct().subscribe(
      (v: any) => {
        this.data = v;
        this.notificationService.show({
          content: 'Get list product success',
          hideAfter: 600,
          position: { horizontal: 'left', vertical: 'bottom' },
          animation: { type: 'fade', duration: 400 },
          type: { style: 'success', icon: true },
        });
      },
      (error) => {
        this.notificationService.show({
          content: error,
          animation: { type: 'slide', duration: 400 },
          position: { horizontal: 'center', vertical: 'bottom' },
          type: { style: 'error', icon: true },
        });
      }
    );
  }

  getProductSingle() {
    this.apiService.getProduct(1).subscribe((v: any) => {
      this.productSingle = v;
    });
  }

  getListProductLimit() {
    this.apiService.getListProductLimit(5).subscribe((v: any) => {
      this.listProductLimit = v;
    });
  }
}
