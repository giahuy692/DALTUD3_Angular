import { Component, OnInit } from '@angular/core';
import { ShopApiService } from '../../share/services/shop-api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  data: any;
  productSingle: any;
  listProductLimit: any;
  constructor(private apiService: ShopApiService) {}

  ngOnInit(): void {
    this.getData();
    this.getProductSingle();
    this.getListProductLimit();
  }

  getData() {
    this.apiService.getListProduct().subscribe((v: any) => {
      this.data = v;
      console.log(v);
    });
  }

  getProductSingle() {
    this.apiService.getProduct(1).subscribe((v: any) => {
      this.productSingle = v;
    });
  }

  getListProductLimit() {
    this.apiService.getListProductLimit(5).subscribe((v: any) => {
      this.listProductLimit = v;
    });
  }
}
