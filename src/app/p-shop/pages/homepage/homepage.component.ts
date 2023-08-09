import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

export interface Item {
  title?: string;
  url?: string;
}
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  data: DTOProduct[];
  productSingle: DTOProduct;
  listProductLimit: any;
  arrUnsubscribe: Subscription[] = [];

  @ViewChild('sv') private scrollView: any;
  public paused = false;
  public items: Item[] = [
    { title: 'Flower', url: 'https://bit.ly/2cJjYuB' },
    { title: 'Mountain', url: 'https://bit.ly/2cTBNaL' },
    { title: 'Sky', url: 'https://bit.ly/2cJl3Cx' },
  ];
  public width = '100%';
  public height = '500px';
  private interval: any;

  constructor(
    private apiService: ShopApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.GetListProduct(1, 5, undefined);
  }

  public ngAfterViewInit(): void {}

  // Handle lấy product detail
  GetProductSingle(data: DTOProduct) {
    let GetProductSingle = this.apiService
      .GetProduct(data._id)
      .subscribe((v) => {
        this.productSingle = v;
      });
    this.arrUnsubscribe.push(GetProductSingle);
  }

  public onButtonClick(): void {
    console.log('click');
  }
  //#endregion

  lickme() {
    this.GetListProduct(1, 5, undefined);
    console.log(this.ListProduct);
  }

  ListProduct = [];
  GetListProduct(page?: number, pageSize?: number, sort?: string) {
    let GetListProduct = this.apiService
      .GetListProduct(page, pageSize, sort)
      .subscribe(
        (v: any) => {
          this.ListProduct = v.products;
          console.log(v);
        },
        (errr) => {
          console.log(errr);
        }
      );

    this.arrUnsubscribe.push(GetListProduct);
  }

  public ngOnDestroy(): void {
    clearInterval(this.interval);
    this.arrUnsubscribe.forEach((s) => {
      s?.unsubscribe();
    });
  }
}
