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

  product: DTOProduct;

  ngOnInit() {
    this.serviceApi.getProduct(1).subscribe((v: DTOProduct) => {
      this.product = v;
    });
  }
}
