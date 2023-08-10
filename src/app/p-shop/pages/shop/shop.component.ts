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
import { error } from 'jquery';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  data: DTOProduct[];
  productSingle: DTOProduct;
  listProductLimit: any;
  arrUnsubscribe: Subscription[] = [];

  //=========Paging==================
  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 9; // Số lượng sản phẩm mỗi trang
  totalItems: number = 0; // Tổng số sản phẩm

  constructor(
    private apiService: ShopApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getData();
    this.getData(this.currentPage, undefined, undefined);
  }

  //# paging
  changePage(page: number | 'prev' | 'next') {
    if (page === 'prev') {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getData(this.currentPage, undefined, undefined);
      }
    } else if (page === 'next') {
      if (this.currentPage < this.totalPages()) {
        this.currentPage++;
        this.getData(this.currentPage, undefined, undefined);
      }
    } else {
      this.currentPage = page;
      this.getData(this.currentPage, undefined, undefined);
    }

    console.log(page);
  }

  getPageNumbers(): number[] {
    this.totalItems = this.data.length;
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    // console.log(this.totalItems, totalPages, this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  updatePageData() {
    this.totalItems = this.data.length;
  }

  //# end paging

  // getAllData() {
  //   let getAllProduct = this.apiService.GetListProduct().subscribe(
  //     (v: any) => {
  //       this.data = v.products;
  //       this.updatePageData();
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  //   this.arrUnsubscribe.push(getAllProduct);
  // }
  //#region Our product
  getData(page?: number, pageSize?: number, sort?: string) {
    let getProduct = this.apiService
      .GetListProduct(page, pageSize, sort)
      .subscribe(
        (v: any) => {
          this.data = v.products;
          this.updatePageData();
        },
        (error) => {
          console.log(error);
        }
      );
    this.arrUnsubscribe.push(getProduct);
  }

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
}
