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
  listProductLimit: any[];

  ngOnInit() {
    // this.serviceApi.getProduct(1).subscribe((v: DTOProduct) => {
    //   this.product = v;
    // });
    this.getListProductLimit();
  }

  getListProductLimit(): void {
    this.serviceApi.getListProductLimit(5).subscribe((v: any) => {
      this.listProductLimit = v.slide(0, 3);
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
