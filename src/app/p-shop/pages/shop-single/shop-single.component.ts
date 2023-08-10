import { Component } from '@angular/core';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../share/services/cart.service';
@Component({
  selector: 'app-shop-single',
  templateUrl: './shop-single.component.html',
  styleUrls: ['./shop-single.component.scss'],
})
export class ShopSingleComponent {
  public product: any;
  constructor(
    private serviceApi: ShopApiService,
    private route: ActivatedRoute,
    public cartService: CartService
  ) {}
  data: DTOProduct[];
  ListProduct: any;
  productSingle: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('productID');
    if (id != null || id != undefined) {
      this.serviceApi.GetProduct(id).subscribe((v: DTOProduct) => {
        this.product = v;
      });
    }
    this.GetProductByCategoryID();
  }

  ngAfterContentInit(): void {}

  GetProductSingle(data: DTOProduct) {
    this.serviceApi.GetProduct(data._id).subscribe((v: any) => {
      this.productSingle = v;
      window.location.reload();
    });
  }
  //xử lí sổ lể của vòng lặp *ngFor
  getStarArray(rate: number): number[] {
    const roundedRate = Math.round(rate);
    return Array(roundedRate).fill(0);
  }

  GetProductByCategoryID() {
    this.serviceApi
      .GetProductByCategoryID('64b157dee27407f744b4bcf8')
      .subscribe(
        (v) => {
          this.ListProduct = v;
          console.log(v);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addToCart() {
    console.log('Click thanh cong');
  }
}
