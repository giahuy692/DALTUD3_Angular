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
  @Input() pageIndex: number = 1;
  @Input() skip: number = 0;
  @Input() limit: number = 20;
  @Input() limits: number[] = [10, 20, 50];
  @Input() selectedValue: number = 20;
  @Input() currentPage: number = 1;
  @Input() total_Pages: number = 0;
  @Input() buttonCount = 4;
  @Input() sizes = [10, 20, 50];

  arrUnsubscribe: Subscription[] = [];

  constructor(private ApiService: ShopApiService, private http: HttpClient) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.GridRef.columns.reset([
      this.GridRef.toolbarTemplateChildren.toArray(),
      this.columns.toArray(),
    ]);
    this.GridRef.autoFitColumns();
  }
}
