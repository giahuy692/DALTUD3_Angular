import { Component, OnInit } from '@angular/core';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Router } from '@angular/router';

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
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
    this.GetProductSingle();
  }

  getData() {
    this.apiService.GetListProduct().subscribe(
      (v: any) => {
        this.data = v;
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

  GetProductSingle() {
    this.apiService
      .GetProduct('64b157dee27407f744b4bcf7')
      .subscribe((v: any) => {
        this.productSingle = v;
      });
  }
}
