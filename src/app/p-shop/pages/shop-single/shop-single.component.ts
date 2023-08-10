import { Component } from '@angular/core';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute
  ) {}
  data: DTOProduct[];
  //product: DTOProduct;
  listProductLimit: DTOProduct[] = [];
  arrProductTogetherCategory: DTOProduct[] = [];
  productSingle: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('productID');
    if (id != null || id != undefined) {
      this.serviceApi.GetProduct(id).subscribe((v: DTOProduct) => {
        this.product = v;
        console.log(this.product);
      });
      console.log(this.listProductLimit);
    }
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
    this.serviceApi.GetListProduct().subscribe((a: any) => {
      this.listProductLimit = a;
      this.listProductLimit.forEach((item: DTOProduct) => {
        if (item.CatalogName == this.product.CatalogName) {
          this.arrProductTogetherCategory.push(item);
        }
      });
    });
  }
  GetProductSingle(data: DTOProduct) {
    this.serviceApi.GetProduct(data._id).subscribe((v: any) => {
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
    this.serviceApi.GetListProduct().subscribe(
      (v: any) => {
        this.data = v;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  addToCart() {
    console.log('Click thanh cong');
  }
}
