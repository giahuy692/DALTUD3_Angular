import { Component } from '@angular/core';
import { MapService } from '../../share/services/map.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { ShopApiService } from '../../share/services/shop-api.service';

@Component({
  selector: 'app-shop-single',
  templateUrl: './shop-single.component.html',
  styleUrls: ['./shop-single.component.scss'],
})
export class ShopSingleComponent {
  product: DTOProduct;
  constructor(
    private mapService: MapService,
    private apiService: ShopApiService
  ) {
    this.mapService.itemDetailProduct.subscribe((a) => {
      this.apiService.getProduct(a.id).subscribe((v) => {
        this.product = v;
      });
    });
  }
}
