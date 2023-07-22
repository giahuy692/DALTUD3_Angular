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

//Jquery

import * as $ from 'jquery';
import { ShopApiService } from '../../services/shop-api.service';
import { Subscription } from 'rxjs';
import { ColumnComponent, GridComponent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-grid-block',
  templateUrl: './grid-block.component.html',
  styleUrls: ['./grid-block.component.scss'],
})
export class GridBlockComponent {
  @ContentChildren(ColumnComponent) columns: any;
  @ViewChild('cumstomGrid') public GridRef: GridComponent;

  @Input() dataView: any;
  pageIndex: number = 1;
  skip: number = 0;
  limit: number = 12;
  limits: number[] = [10, 20, 50];
  selectedValue: number = 10;
  currentPage: number = 1;
  total_Pages: number = 0;
  public buttonCount = 4;

  arrUnsubscribe: Subscription[] = [];

  constructor(private ApiService: ShopApiService, private http: HttpClient) {}

  ngOnInit() {
    $(document).ready(function () {
      // Runs after the DOM is loaded.
      // console.log('DOM fully loaded!');
      // $('.k-pager-first').html('<span>Đầu</span>');
      // $('.k-pager-last').html('<span>Cuối</span>');
      // $('.pageSize .k-label').html('<span>Hiển thị mỗi trang</span>');
      // $('.k_prev button:nth-child(2)').html(
      //   '<img src="assets/images/chevronleft.svg" alt="chevronleft">'
      // );
      // $('.k_next button:nth-child(1)').html(
      //   '<img src="assets/images/chevronright.svg" alt="chevronright">'
      // );
      // $('.k-input-value-text').css({ color: '#26282E' });
      // $('.k-pager-first, .k-pager-last').css({
      //   width: '45px',
      //   height: '29px',
      //   'border-radius': '3px',
      //   'font-weight': '400',
      //   'font-size': '13px',
      //   color: '#959db3',
      // });
    });
  }

  ngAfterViewInit() {
    this.GridRef.columns.reset([
      this.GridRef.toolbarTemplateChildren.toArray(),
      this.columns.toArray(),
    ]);
    this.GridRef.autoFitColumns();
  }
}
