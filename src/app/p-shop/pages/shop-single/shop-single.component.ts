import { Component } from '@angular/core';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from '../../share/services/map.service';
@Component({
  selector: 'app-shop-single',
  templateUrl: './shop-single.component.html',
  styleUrls: ['./shop-single.component.scss'],
})
export class ShopSingleComponent {
  public product: any;
  constructor(
    private serviceApi: ShopApiService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private mapService: MapService
  ) {}
  data: DTOProduct[];
  //product: DTOProduct;
  listProductLimit: DTOProduct[] = [];
  arrProductTogetherCategory: DTOProduct[] = [];
  productSingle: any;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('productID'));
    this.serviceApi.getProduct(id).subscribe((v: DTOProduct) => {
      this.product = v;
      console.log(this.product);
    });
    console.log(this.listProductLimit);
    //======================================================================
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
  getProductSingle(data: DTOProduct) {
    this.serviceApi.getProduct(data.id).subscribe((v: any) => {
      this.productSingle = v;
      window.location.reload();
      //reload() => refresh lại trang khi click vào sản phẩm liên quan
    });
  }
  //xử lí sổ lể của vòng lặp *ngFor
  getStarArray(rate: number): number[] {
    const roundedRate = Math.round(rate);
    return Array(roundedRate).fill(0);
  }

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
  // refreshPage() {
  //   this.serviceApi.getListProduct().subscribe((a: any) => {
  //     this.listProductLimit = a;
  //     this.listProductLimit.forEach((item: DTOProduct) => {
  //       if (item.category == this.product.category) {
  //         this.arrProductTogetherCategory.push(item);
  //       }
  //     });
  //   });
  //   window.location.reload();
  // }

  onClickProduct(data: DTOProduct) {
    this.mapService.id.next(data.id);
    // this.router.navigate(['/shop-detail']);
  }
  // onClickRelatedProduct() {
  //   this.refreshPage();
  // }
}
