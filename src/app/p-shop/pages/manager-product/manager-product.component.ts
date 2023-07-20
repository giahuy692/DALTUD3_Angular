import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';

@Component({
  selector: 'app-manager-product',
  templateUrl: './manager-product.component.html',
  styleUrls: ['./manager-product.component.scss'],
})
export class ManagerProductComponent implements OnInit {
  arrUnsubscribe: Subscription[] = [];

  constructor(private apiService: ShopApiService) {}

  data: DTOProduct[];
  listProduct: DTOProduct[];

  ngOnInit(): void {
    this.GetListProduct(1, 100, undefined);
  }

  //#region Our product

  GetListProduct(page?: number, pageSize?: number, sort?: string) {
    let GetListProduct = this.apiService
      .getListProduct(page, pageSize, sort)
      .subscribe(
        (v: any) => {
          this.listProduct = v.products;
        },
        (errr) => {
          console.log(errr);
        }
      );

    this.arrUnsubscribe.push(GetListProduct);
  }

  onclick() {
    console.log('click thành công');
  }
}
