import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { ShopApiService } from '../../share/services/shop-api.service';

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

  // =====================================================================
@ViewChild("sv") private scrollView: any;

  myData:any =  [
    { title: "Flower", url: "https://bit.ly/2cJjYuB" },
    { title: "Mountain", url: "https://bit.ly/2cTBNaL" },
    { title: "Sky", url: "https://bit.ly/2cJl3Cx" },
  ];
  public paused = false;
  public items: Item[] = this.myData;
  public width = "100%";
  public height = "500px";
  private interval: any;

  public ngAfterViewInit(): void {
    this.interval = setInterval(() => {
      
        this.scrollView.next();
      
    }, 3000);
  }

  public ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
