import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-blog-group',
  templateUrl: './blog-group.component.html',
  styleUrls: ['./blog-group.component.scss'],
})
export class BlogGroupComponent implements OnInit {
  @Input() backgroundImage: string;
  private _myDate: Date;
  @Input() set myDate(value: string) {
    this._myDate = new Date(value);
  }

  get myDate(): string {
    return this._myDate.toISOString(); // Hoặc bạn có thể trả về định dạng ngày/tháng/yêu cầu khác
  }
  @Input() actor: string;
  @Input() title: string;
  @Input() content: string;
  @Input() contentBtn: string;
  @Input() link: string = '';

  ngOnInit(): void {
    console.log(this.myDate);
  }
}
