import { Component } from '@angular/core';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Router } from '@angular/router';
import { MapService } from '../../share/services/map.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
  constructor(
    private serviceApi: ShopApiService,
    private notificationService: NotificationService,
    private router: Router,
    private mapService: MapService
  ) {}

  data: DTOProduct[];
  product: DTOProduct;
  listProductLimit: DTOProduct[] = [];
  arrProductTogetherCategory: DTOProduct[] = [];
  productSingle: any;

  ngOnInit() {
    this.serviceApi.getProduct(1).subscribe((v: DTOProduct) => {
      this.product = v;
    });
    console.log(this.listProductLimit);

    this.getData();
    this.getListProductLimit();
  }

  ngAfterContentInit(): void {
    this.getListProductLimit();
  }

  // Tạo một mảng để chứa dữ liệu từ api trả về cho listproductlimit[]
  // FoEach mảng listproductlimit[]
  getListProductLimit(): void {
    this.serviceApi.getListProduct().subscribe((a: any) => {
      this.listProductLimit = a;
      this.listProductLimit.forEach((item: DTOProduct) => {
        if (item.category == this.product.category) {
          this.arrProductTogetherCategory.push(item);
        }
      });
    });
  }

  getStarArray(rate: number): number[] {
    const roundedRate = Math.round(rate);
    return Array(roundedRate).fill(0);
  }

  // onClickProduct(data: DTOProduct) {
  //   console.log(data);
  // }

  //Lấy chi tiết sản phẩm
  // getProductSingle(data: DTOProduct) {
  //   // data: DTOProduct là giá trị nhận được khi click vào 1 sản phẩm
  //   this.serviceApi.getProduct(data.id).subscribe((v: any) => {
  //     // Api getProduct truyền (data.id)
  //     this.product = v; //Nhận được product detail từ api trả về dựa vào id được truyền là data.id gán vào biến product
  //     console.log('ProductSingle', this.product); //console ra giá trị hiện tại của product thông qua id
  //   });
  // }

  getData() {
    this.serviceApi.getListProduct().subscribe(
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
      (error: any) => {
        this.notificationService.show({
          content: error,
          animation: { type: 'slide', duration: 400 },
          position: { horizontal: 'center', vertical: 'bottom' },
          type: { style: 'error', icon: true },
        });
      }
    );
  }

  getProductSingle(data: DTOProduct) {
    this.serviceApi.getProduct(data.id).subscribe((v: any) => {
      this.productSingle = v;
    });
  }

  // getListProductLimit() {
  //   this.apiService.getListProductLimit(5).subscribe((v: any) => {
  //     this.listProductLimit = v;
  //   });
  // }

  onClickProduct(data: DTOProduct) {
    this.mapService.id.next(data.id);
    // this.router.navigate(['/shop-detail']);
  }
}
