import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  ViewChild,
  QueryList,
  ElementRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColumnComponent, GridComponent } from '@progress/kendo-angular-grid';
import { ShopApiService } from '../../share/services/shop-api.service';
import * as $ from 'jquery';
import { DTOContact } from '../../share/dtos/DTOContact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  @ContentChildren(ColumnComponent) columns: any;
  @ViewChild('cumstomGrid') public GridRef: GridComponent;

  @Input() dataView: any;
  pageIndex: number = 1;
  skip: number = 0;
  limit: number = 20;
  limits: number[] = [10, 20, 50];
  selectedValue: number = 10;
  currentPage: number = 1;
  total_Pages: number = 0;
  public buttonCount = 4;

  data = [
    {
      Fullname: 'Anh Teo :v',
      Email: 'Teo21@w',
      Phone: '01234567678',
      Message: 'demo',
      IsRead: false,
    },
  ];

  contact = new DTOContact();

  constructor(
    private productService: ShopApiService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.cssjquery;
  }

  ngAfterViewInit() {
    this.GridRef.columns.reset([
      this.GridRef.toolbarTemplateChildren.toArray(),
      this.columns.toArray(),
    ]);
    this.GridRef.autoFitColumns();
  }

  cssjquery() {
    $(document).ready(function () {
      // Runs after the DOM is loaded.
      console.log('DOM fully loaded!');
      $('.k-pager-first').html('<span>Đầu</span>');
      $('.k-pager-last').html('<span>Cuối</span>');
      $('.pageSize .k-label').html('<span>Hiển thị mỗi trang</span>');
      $('.k_prev button:nth-child(2)').html(
        '<img src="assets/images/chevronleft.svg" alt="chevronleft">'
      );
      $('.k_next button:nth-child(1)').html(
        '<img src="assets/images/chevronright.svg" alt="chevronright">'
      );
      $('.k-input-value-text').css({ color: '#26282E' });
      $('.k-pager-first, .k-pager-last').css({
        width: '45px',
        height: '29px',
        'border-radius': '3px',
        'font-weight': '400',
        'font-size': '13px',
        color: '#959db3',
      });
    });
  }
}
