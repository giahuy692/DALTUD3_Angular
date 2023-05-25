import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DTOProduct } from '../dtos/DTOProduct';

@Injectable({
  providedIn: 'root',
})
export class ShopApiService {
  constructor(private http: HttpClient) {}

  // API lấy tất cả các sản phẩm
  getListProduct() {
    return new Observable<DTOProduct>((obs) => {
      this.http.get<DTOProduct>('https://fakestoreapi.com/products').subscribe(
        (res) => {
          obs.next(res);
          obs.complete();
        },
        (error) => {
          obs.error(error);
          obs.complete();
        }
      );
    });
  }

  //API lấy chi tiết một sản phẩm
  getProduct(id: number) {
    return new Observable<DTOProduct>((obs) => {
      this.http
        .get<DTOProduct>(`https://fakestoreapi.com/products/${id}`)
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  // Lấy danh sách sản phẩm theo phân trang
  getListProductLimit(limit: number) {
    return new Observable<DTOProduct>((obs) => {
      this.http
        .get<DTOProduct>(`https://fakestoreapi.com/products?limit=${limit}`)
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  // Lấy danh sách được sắp xếp theo chiều tăng/giảm dần 'desc'(giảm) or 'asc'(tăng)
  getListProductSort(value: string) {
    return new Observable<DTOProduct>((obs) => {
      this.http
        .get<DTOProduct>(`https://fakestoreapi.com/products?sort=${value}`)
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  // Lấy tất cả categories của sản phẩm
  getAllCategories() {
    return new Observable<DTOProduct>((obs) => {
      this.http
        .get<DTOProduct>(`https://fakestoreapi.com/products/categories`)
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  // Lấy tất cả các sản phẩm cùng loại
  GetProductsInASpecificCategory(category: string) {
    return new Observable<DTOProduct>((obs) => {
      this.http
        .get<DTOProduct>(
          `https://fakestoreapi.com/products/category/${category}`
        )
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  // Thêm sản phẩm mới - chỉ là thêm giả sản phẩm và sẽ không có sản phẩm náo thực sự được tạo mới trong database
  // Cần truyền 1 dự liệu dưới dạng object - api trả về một đối tượng được thêm mới
  AddNewProduct(dataObject: string) {
    return new Observable<DTOProduct>((obs) => {
      this.http
        .post<DTOProduct>(
          `https://fakestoreapi.com/products`,
          JSON.stringify(dataObject)
        )
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }

  // Cập nhật sản phẩm lưu ý cũng là api giả cập nhật nên cũng sẽ không có data nào thực sự được cập nhật trong data base
  // api trả về đối tượng được cập nhật
  UpdateAProduct(id: number, dataObject: any) {
    return new Observable<DTOProduct>((obs) => {
      this.http
        .put<DTOProduct>(
          `https://fakestoreapi.com/products/${id}`,
          JSON.stringify(dataObject)
        )
        .subscribe(
          (res) => {
            obs.next(res);
            obs.complete();
          },
          (error) => {
            obs.error(error);
            obs.complete();
          }
        );
    });
  }
}
