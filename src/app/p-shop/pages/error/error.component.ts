import { Component, OnInit } from '@angular/core';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { NotificationService } from '@progress/kendo-angular-notification';
import { MapService } from '../../share/services/map.service';
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
    private router: Router,
    private mapService: MapService
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
        // this.notificationService.show({
        //   content: 'Get list product success',
        //   hideAfter: 600,
        //   position: { horizontal: 'left', vertical: 'bottom' },
        //   animation: { type: 'fade', duration: 400 },
        //   type: { style: 'success', icon: true },
        // });
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
    this.apiService
      .getProduct('64b157dee27407f744b4bcf7')
      .subscribe((v: any) => {
        this.productSingle = v;
      });
  }

  getListProductLimit() {
    this.apiService.getListProductLimit(5).subscribe((v: any) => {
      this.listProductLimit = v;
    });
  }

  onClickProduct(data: DTOProduct) {
    this.mapService.id.next(data._id);
    // this.router.navigate(['/shop-detail']);
  }
}
