import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  arrHeader = new Subject<any>();
  id = new Subject<number>();

  itemDetailProduct = new Subject<any>(); // trao đổi dữ liệu 2 bên

  constructor(private http: HttpClient) {}
}
