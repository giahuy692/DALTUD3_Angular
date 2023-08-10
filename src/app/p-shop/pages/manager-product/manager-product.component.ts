import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, from, interval } from 'rxjs';
import { ShopApiService } from '../../share/services/shop-api.service';
import { DTOProduct } from '../../share/dtos/DTOProduct';
import { NotificationService } from '@progress/kendo-angular-notification';
import {
  DialogCloseResult,
  DialogRef,
  DialogService,
} from '@progress/kendo-angular-dialog';
import {
  FileRestrictions,
  SelectEvent,
  RemoveEvent,
  ErrorEvent,
  CancelEvent,
  PauseEvent,
  ResumeEvent,
  SuccessEvent,
  UploadEvent,
  UploadProgressEvent,
  ChunkSettings,
  FileInfo,
} from '@progress/kendo-angular-upload';
import { layoutService } from '../../share/services/layout.service';
import { StringFilterMenuComponent } from '@progress/kendo-angular-grid';
import { DrawerComponent } from '@progress/kendo-angular-layout';
import { FormControl, FormGroup } from '@angular/forms';
import { error } from 'jquery';
import { DTOCategory } from '../../share/dtos/DTOCategory';

@Component({
  selector: 'app-manager-product',
  templateUrl: './manager-product.component.html',
  styleUrls: ['./manager-product.component.scss'],
})
export class ManagerProductComponent implements OnInit {
  @ViewChild('drawer') drawerRef: DrawerComponent;
  arrUnsubscribe: Subscription[] = [];
  data: DTOProduct[];
  listProduct: DTOProduct[];
  limit: number = 20;
  limits: number[] = [10, 20, 50];
  selectedValue: number = 20;
  currentPage: number = 1;
  public CategoryList: DTOCategory[];
  public result: string;
  public form: FormGroup;
  CatagoryItem = {
    _id: '64b157dee27407f744b4bcf6',
    Name: 'Man',
    Sort_order: 1,
  };

  // ====================================================================
  // public expanded = false;
  // public productName: string = 'Demo';
  // public category: string = '';
  // public price: number = 100000;
  // public description: string = 'This is product demo';
  // public quantity: number = 10;
  productList: DTOProduct[] = [];
  currentProduct = new DTOProduct();
  constructor(
    private apiService: ShopApiService,
    private notificationService: NotificationService,
    private layout: layoutService,
    private dialogService: DialogService
  ) {
    // this.form = new FormGroup({
    //   productName: new FormControl(this.currentProduct.ProductName),
    //   category: new FormControl(this.currentProduct.CatalogName),
    //   price: new FormControl(this.currentProduct.Price),
    //   quantity: new FormControl(this.currentProduct.Quantity),
    //   description: new FormControl(this.currentProduct.Description),
    // });

    this.form = new FormGroup({
      _id: new FormControl(),
      CatalogId: new FormControl(this.CatagoryItem._id),
      CatalogName: new FormControl(this.CatagoryItem.Name),
      ProductName: new FormControl(),
      Price: new FormControl(),
      Discount: new FormControl(),
      Description: new FormControl(),
      Quantity: new FormControl(),
      Image_Link: new FormControl(),
      Image_List: new FormControl(),
    });
  }

  private interval: any;

  ngOnInit(): void {
    this.GetListProduct(this.CatagoryItem._id);
    this.getCatagory();
  }

  public selectionDdropDown(value: any): void {
    console.log('selectionChange', value);
    this.GetListProduct(value._id);
    this.CatagoryItem = value;

    // console.log(this.form.value);
  }

  public selectionChange(value: any): void {
    // console.log('selectionChange', value);
    this.form.patchValue({
      CatalogId: value._id,
      CatalogName: value.Name,
    });

    // console.log(this.form.value);
  }

  //# Get category

  getCatagory() {
    let GetCatagory = this.apiService.GetListCategory().subscribe(
      (v: any) => {
        this.CategoryList = v.categorys;
        // console.log(this.CategoryList);
      },
      (error) => {
        console.log(error);
      }
    );
    this.arrUnsubscribe.push(GetCatagory);
  }

  // end get catogory

  //#region Our product

  GetListProduct(CatalogId: string) {
    let GetListProduct = this.apiService
      .GetProductByCategoryID(CatalogId)
      .subscribe(
        (v: any) => {
          this.listProduct = v;
          // console.log(v);
        },
        (errr) => {
          console.log(errr);
        }
      );

    this.arrUnsubscribe.push(GetListProduct);
  }

  //Create product

  addNewProduct() {
    this.drawerRef.toggle();
    // this.from = new FormGroup({});
  }

  editProduct() {
    this.drawerRef.toggle();
  }

  //# End create product

  onclick() {
    // Đóng drawer sau khi click "SAVE"
    this.drawerRef.toggle();

    this.currentProduct.ProductName = this.form.get('ProductName')?.value;
    this.currentProduct.CatalogName = this.form.get('Category')?.value;
    this.currentProduct.Price = this.form.get('Price')?.value;
    this.currentProduct.Discount = this.form.get('Discount')?.value;
    this.currentProduct.Quantity = this.form.get('Quantity')?.value;
    this.currentProduct.Description = this.form.get('Description')?.value;

    this.currentProduct.Image_link =
      '../../../../assets/img/product/ao-polo-cafe-apm3635-gre-9-yodyvn.jpg';

    // console.log('Thông tin sản phẩm:');
    console.log(this.form.value);

    // this.onCreate(this.currentProduct);
  }

  onCreate(dtoProduct: DTOProduct) {
    this.apiService.CreateProduct(dtoProduct).subscribe(
      (v: any) => {
        if (this.currentProduct.ProductName != null) {
          this.GetListProduct(this.CatagoryItem._id);
          this.layout.showSuccess('Create product susscess!');
          this.form.reset(this.currentProduct);
        } else {
          this.layout.showError('Create product is faile!');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //# Delete Product
  // onDelete(value: any) {
  //   console.log(value);
  // let onDelete = this.apiService.DeleteProduct(value).subscribe(
  //   (v) => {
  //     this.GetListProduct(' ');
  //     this.layout.showSuccess('Delete product success');
  //   },
  //   (errr) => {
  //     console.log(errr);
  //   }
  // );
  // this.arrUnsubscribe.push(onDelete);
  // }

  //# Dialog thực hiện sau khi cick nút xóa
  @ViewChild('btn') btnRef: { nativeElement: { focus: () => void } };

  itemProduct: any;

  public opened = false;
  public close(): void {
    this.opened = false;
    this.btnRef.nativeElement.focus();
  }

  public open(Item: any): void {
    this.itemProduct = Item;
    this.opened = true;
  }

  //thực hiện xóa
  onDelete() {
    // alert('Xóa ' + this.itemProduct.ProductName + ' thành công');
    // console.log(this.itemProduct);

    let deleteProduct = this.apiService
      .DeleteProduct(this.itemProduct)
      .subscribe(
        (v) => {
          this.GetListProduct(this.CatagoryItem._id);
          this.layout.showSuccess('Delete product success');
        },
        (errr) => {
          console.log(errr);
        }
      );
    this.arrUnsubscribe.push(deleteProduct);

    this.opened = false;
    this.btnRef.nativeElement.focus();
  }

  //End dialog

  //# upload image

  // uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  // uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
  // public uploadRestrictions: FileRestrictions = {
  //   allowedExtensions: ['.jpg', '.png'],
  // };

  // public valueChange(e: FileInfo[]): void {
  //   console.log(`valueChange event ${e[0].name}`);
  // }

  // end upload

  public ngOnDestroy(): void {
    clearInterval(this.interval);
    this.arrUnsubscribe.forEach((s) => {
      s?.unsubscribe();
    });
  }
}
