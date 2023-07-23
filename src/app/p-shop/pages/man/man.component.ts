import { Component } from '@angular/core';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Router } from '@angular/router';
import { layoutService } from '../../share/services/layout.service';

@Component({
  selector: 'app-man',
  templateUrl: './man.component.html',
  styleUrls: ['./man.component.scss'],
})
export class ManComponent {
  constructor(
    private serviceApi: ShopApiService,
    private layout: layoutService
  ) {}

  data: DTOProduct[];
  product: DTOProduct;
  listProductLimit: DTOProduct[] = [];
  arrProductTogetherCategory: DTOProduct[] = [];
  productSingle: any;

  ngOnInit() {
    this.serviceApi
      .GetProduct('64b157dee27407f744b4bcf6')
      .subscribe((v: DTOProduct) => {
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

  getData() {
    this.serviceApi.GetListProduct().subscribe(
      (v: any) => {
        this.data = v;
      },
      (error: any) => {
        console.log(error);
        this.layout.showError('Get list product failed!');
      }
    );
  }

  GetProductSingle(data: DTOProduct) {
    this.serviceApi.GetProduct(data._id).subscribe((v: any) => {
      this.productSingle = v;
    });
  }

  // getListProductLimit() {
  //   this.apiService.getListProductLimit(5).subscribe((v: any) => {
  //     this.listProductLimit = v;
  //   });
  // }
}
