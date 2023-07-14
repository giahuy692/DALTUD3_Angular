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
import { MapService } from '../../share/services/map.service';
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
    private mapService: MapService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getListProductLimit();
    this.GetListProduct(1, 5, undefined);
  }

  public ngAfterViewInit(): void {
    this.interval = setInterval(() => {
      this.scrollView.next();
    }, 3000);
  }

  //#region Our product
  getData() {
    let getData = this.apiService.getListProduct().subscribe(
      (v: any) => {
        this.data = v;
        // this.notificationService.show({
        //   content: 'Get list product success',
        //   hideAfter: 600,
        //   position: { horizontal: 'left', vertical: 'bottom' },
        //   animation: { type: 'fade', duration: 400 },
        //   type: { style: 'success', icon: true },
        // });
      },
      (error) => {
        this.notificationService.show({
          content: error,
          animation: { type: 'slide', duration: 400 },
          position: { horizontal: 'center', vertical: 'bottom' },
          type: { style: 'error', icon: true },
        });
      }
    );

    this.arrUnsubscribe.push(getData);
  }

  // Handle lấy product detail
  getProductSingle(data: DTOProduct) {
    let getProductSingle = this.apiService
      .getProduct(data.id)
      .subscribe((v) => {
        this.productSingle = v;
      });
    //=============================================================================
    // // data: DTOProduct là giá nhận được khi click vào 1 sản phẩm
    // this.apiService.getProduct(data.id).subscribe((v: any) => {
    //   // Api getProduct truyền (data.id )
    //   this.productSingle = v; // Nhận được product đetail từ api trả về dự vào id được truyền là data.id gán vào biến productSingle
    //   console.log('productSingle', this.productSingle); // console ra giá trị hiện tại của productSingle

    // });
    this.arrUnsubscribe.push(getProductSingle);
  }

  getListProductLimit() {
    this.apiService.getListProductLimit(8).subscribe((v: any) => {
      this.listProductLimit = v;
    });
  }
  onClickProduct(data: DTOProduct) {
    this.mapService.id.next(data.id);
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
      .getListProduct(page, pageSize, sort)
      .subscribe(
        (v: any) => {
          this.ListProduct = v;
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
