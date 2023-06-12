import { Component } from '@angular/core';
import { MapService } from '../../share/services/map.service';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-shop-single',
  templateUrl: './shop-single.component.html',
  styleUrls: ['./shop-single.component.scss'],
})
export class ShopSingleComponent {
  public product: any;
  constructor(
    private mapService: MapService,
    private apiService: ShopApiService,
    private route: ActivatedRoute
  ) {}
  listProductLimit: DTOProduct[] = [];
  arrProductTogetherCategory: DTOProduct[] = [];

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('productID'));
    this.apiService.getProduct(id).subscribe((a) => {
      this.product = a;
      console.log(this.product);
    });
    //======================================================================
    this.apiService.getProduct(1).subscribe((v: DTOProduct) => {
      this.product = v;
    });
    this.getListProductLimit();

    console.log(this.listProductLimit);
  }

  getListProductLimit(): void {
    this.apiService.getListProduct().subscribe((a: any) => {
      this.listProductLimit = a;
      this.listProductLimit.forEach((item: DTOProduct) => {
        if (item.category == this.product.category) {
          this.arrProductTogetherCategory.push(item);
        }
      });
    });
  }
}
