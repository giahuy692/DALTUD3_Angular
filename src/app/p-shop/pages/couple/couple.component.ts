import { Component } from '@angular/core';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Router } from '@angular/router';
import { layoutService } from '../../share/services/layout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-couple',
  templateUrl: './couple.component.html',
  styleUrls: ['./couple.component.scss'],
})
export class CoupleComponent {
  constructor(
    private apiService: ShopApiService,
    private layout: layoutService,
    private router: Router
  ) {}

  data: DTOProduct[];
  product: DTOProduct;
  listProductLimit: DTOProduct[] = [];
  arrProductTogetherCategory: DTOProduct[] = [];
  productSingle: any;
  arrUnsubscribe: Subscription[] = [];

  ngOnInit() {
    this.getData('64b157dee27407f744b4bcf8');
    this.getListProductLimit();
  }

  ngAfterContentInit(): void {
    this.getListProductLimit();
  }

  // Tạo một mảng để chứa dữ liệu từ api trả về cho listproductlimit[]
  // FoEach mảng listproductlimit[]
  getListProductLimit(): void {
    this.apiService.GetListProduct().subscribe((a: any) => {
      this.listProductLimit = a;
      this.listProductLimit.forEach((item: DTOProduct) => {
        if (item.CatalogName == this.product.CatalogName) {
          this.arrProductTogetherCategory.push(item);
        }
      });
    });
  }

  getStarArray(rate: number): number[] {
    const roundedRate = Math.round(rate);
    return Array(roundedRate).fill(0);
  }

  getData(_id: string) {
    let getProduct = this.apiService.GetProductByCategoryID(_id).subscribe(
      (v: any) => {
        this.data = v;
      },
      (error) => {
        console.log(error);
      }
    );
    this.arrUnsubscribe.push(getProduct);
  }

  GetProductSingle(data: DTOProduct) {
    this.apiService.GetProduct(data._id).subscribe((v: any) => {
      this.productSingle = v;
    });
  }
}
