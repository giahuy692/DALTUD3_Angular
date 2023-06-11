import { Component } from '@angular/core';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  constructor(private serviceApi: ShopApiService) {}
  data: DTOProduct[];
  product: DTOProduct;
  listProductLimit: DTOProduct[] = [];
  arrProductTogetherCategory: DTOProduct[] = [];

  ngOnInit() {
    this.serviceApi.getProduct(1).subscribe((v: DTOProduct) => {
      this.product = v;
    });
    this.getListProductLimit();

    console.log(this.listProductLimit);
  }

  // Tạo một mảng để chứa dữ liệu từ api trả về cho listproductlimit[]
  // FoEach mảng listproductlimit[]
  getListProductLimit(): void {
    // this.serviceApi.getListProductLimit(3).subscribe((a: any) => {
    //   this.listProductLimit = a;
    //   this.listProductLimit.forEach((item: DTOProduct) => {
    //     if (item.category == this.product.category) {
    //       this.arrProductTogetherCategory.push(item);
    //     }
    //   });
    // });

    this.serviceApi.getListProduct().subscribe((a: any) => {
      this.listProductLimit = a;
      this.listProductLimit.forEach((item: DTOProduct) => {
        if (item.category == this.product.category) {
          this.arrProductTogetherCategory.push(item);
        }
      });
    });
  }

  onClickProduct(data: DTOProduct) {
    console.log(data);
  }

  //Lấy chi tiết sản phẩm
  // getProductSingle(data: DTOProduct) {
  //   // data: DTOProduct là giá trị nhận được khi click vào 1 sản phẩm
  //   this.serviceApi.getProduct(data.id).subscribe((v: any) => {
  //     // Api getProduct truyền (data.id)
  //     this.product = v; //Nhận được product detail từ api trả về dựa vào id được truyền là data.id gán vào biến product
  //     console.log('ProductSingle', this.product); //console ra giá trị hiện tại của product thông qua id
  //   });
  // }
}
