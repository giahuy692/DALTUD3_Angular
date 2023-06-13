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

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('productID'));
    this.apiService.getProduct(id).subscribe((a) => {
      this.product = a;
      console.log(this.product);
    });
  }
}
