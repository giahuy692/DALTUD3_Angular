import { Component } from '@angular/core';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.scss'],
})
export class WomenComponent {
  constructor(private serviceApi: ShopApiService) {}

  data: DTOProduct[];
  product: DTOProduct;
  listProductLimit: DTOProduct[] = [];
  arrProductTogetherCategory: DTOProduct[] = [];
  productSingle: any;

  ngOnInit() {
    this.GetListProduct();
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

  getStarArray(rate: number): number[] {
    const roundedRate = Math.round(rate);
    return Array(roundedRate).fill(0);
  }

  GetListProduct() {
    this.serviceApi.GetListProduct().subscribe(
      (v: any) => {
        this.data = v;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  GetProductSingle(data: DTOProduct) {
    this.serviceApi.GetProduct(data._id).subscribe((v: any) => {
      this.productSingle = v;
    });
  }

  onClickProduct(data: DTOProduct) {}
}
