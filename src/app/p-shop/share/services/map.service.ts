import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  arrHeader = new Subject<any>();
  id = new Subject<number>();

  constructor(private http: HttpClient) {}
}
